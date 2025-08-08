# LLM Document Processor

An interactive web application that processes documents using LLM technology and provides intelligent query responses with real UPI payment integration.

## 🚀 Features

### 📄 Document Upload
- Upload PDFs, Word docs, or email extracts
- Auto-converts documents to raw text (OCR support)
- Preprocesses and chunks documents
- Generates embeddings using OpenAI/Cohere
- Stores in vector database (Pinecone/FAISS)

### 🧠 Query Interface
- Accept natural language queries like "46M, knee surgery in Pune, 3-month policy"
- Uses GPT-4 to extract entities and perform semantic search
- Returns structured decisions with justifications
- Real UPI payment integration (₹20 per query)

### 📚 Clause Traceability
- Shows step-by-step decision process
- Entity extraction visualization
- Semantic search results
- Condition verification steps
- Final decision reasoning

### 🗂 History & Logs
- View past queries and results
- Download JSON responses
- Filter by status and date
- Audit trail for compliance

### 🔐 Admin Dashboard
- System health monitoring
- Usage statistics
- Error tracking
- Performance metrics

### 💳 Real UPI Payments
- Integration with GPay, PhonePe, Paytm
- UPI deep links for seamless payments
- Payment verification system
- Secure transaction handling

## 🛠 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js/FastAPI (planned)
- **LLM**: GPT-4 via OpenAI API
- **Embeddings**: OpenAI/Cohere
- **Vector DB**: Pinecone/FAISS
- **OCR**: Amazon Textract/Tesseract.js
- **Storage**: AWS S3
- **Database**: PostgreSQL/Supabase
- **Payments**: UPI Deep Links + Razorpay (optional)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd llm-doc-processor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 API Response Format

All query responses follow this JSON structure:

```json
{
  "decision": "approved",
  "amount": "₹75,000",
  "justification": "Clause 4.3: Surgery under orthopedic category is covered after 90 days of policy start",
  "referenced_clauses": [
    {
      "clause_number": "4.3",
      "clause_text": "Orthopedic surgeries are covered after 90 days."
    }
  ]
}
```

## 🧪 Sample Usage

**Query**: "46M, knee surgery in Pune, 3-month policy"

**Expected Output**:
- Decision: ✅ Approved
- Amount: ₹75,000
- Clause: 4.3
- Justification: "Knee surgery is covered after 90 days, and the policy is 3 months old"

## 💳 Payment Integration

The app uses real UPI payments:
- **UPI ID**: rik64712@oksbi
- **Amount**: ₹20 per query
- **Payment Flow**: Query → Payment → Results
- **Supported Apps**: GPay, PhonePe, Paytm, etc.

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_OPENAI_API_KEY=your_openai_key
REACT_APP_PINECONE_API_KEY=your_pinecone_key
REACT_APP_UPI_ID=rik64712@oksbi
```

## 📱 Pages Overview

1. **Document Upload** - Upload and process documents
2. **Query Interface** - Ask questions and get AI responses
3. **Payment Gateway** - Real UPI payment processing
4. **Clause Traceability** - Understand AI decision process
5. **History** - View past queries and results
6. **Admin Dashboard** - System monitoring and analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@example.com or join our Slack channel.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- React team for the amazing framework
- Tailwind CSS for styling
- All contributors and testers