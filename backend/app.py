from flask import Flask, request, jsonify
import fitz  # PyMuPDF module
from openai import OpenAI

client = OpenAI(api_key='put your api key here')
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def read_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def generate_multiple_choice_questions(text):
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Create ten multiple choice questions from the following text for a university exam. Provide four answer choices for each question and indicate the correct answer as 'Correct answer: [answer]'.\n\n{text}\n\n"}
    ]
    try:
        response = client.chat.completions.create(model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=3000,
        n=1,
        stop=None,
        temperature=0.7)
        return response.choices[0].message.content.strip()
    except OpenAI.OpenAIError as e:
        print(f"Error generating questions: {e}")
        return "Error generating questions"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)
        text = read_pdf(file_path)
        if not text:
            return jsonify({"error": "Error reading PDF"}), 500
        questions_text = generate_multiple_choice_questions(text)
        if questions_text == "Error generating questions":
            return jsonify({"error": "Error generating questions"}), 500

        os.remove(file_path)

        questions = []
        correct_answers = []
        blocks = questions_text.split('\n\n')
        for block in blocks:
            lines = block.split('\n')
            if len(lines) < 6:
                print("Error processing question block:", block)
                continue
            question = lines[0]
            answers = lines[1:5]
            correct_answer_line = next((line for line in lines if "Correct answer:" in line), None)
            if correct_answer_line:
                correct_answer = correct_answer_line.split("Correct answer: ")[1]
                correct_answer_text = next((answer for answer in answers if correct_answer in answer), "Missing correct answer")
            else:
                correct_answer_text = "Missing correct answer"
            questions.append({
                "question": question,
                "answers": answers,
                "correctAnswer": correct_answer_text
            })
        return jsonify({"questions": questions, "correct_answers": correct_answers})

@app.route('/check_answers', methods=['POST'])
def check_answers():
    data = request.json
    user_answers = data['answers']
    correct_answers = data['correct_answers']
    score = sum(1 for ua, ca in zip(user_answers, correct_answers) if ua == ca)
    return jsonify({"score": score, "total": len(correct_answers)})

if __name__ == '__main__':
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    app.run(debug=True, port=5000)
