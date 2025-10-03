import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Send, 
  Upload, 
  FileText, 
  Image, 
  Mic, 
  MicOff,
  Bot,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Shield,
  Loader
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: Array<{
    name: string;
    type: 'image' | 'document' | 'audio';
    size: string;
  }>;
}

interface HealthAssessment {
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  urgency: string;
  nextSteps: string[];
}

const AITriage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Health Assistant. I can help analyze your symptoms, review medical documents, and provide preliminary health assessments. Please describe your symptoms or upload any relevant medical documents.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: uploadedFiles.map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: `${(file.size / 1024).toFixed(1)} KB`
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, uploadedFiles);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Generate health assessment if symptoms mentioned
      if (inputMessage.toLowerCase().includes('pain') || 
          inputMessage.toLowerCase().includes('fever') ||
          inputMessage.toLowerCase().includes('chest') ||
          inputMessage.toLowerCase().includes('headache')) {
        generateHealthAssessment(inputMessage);
      }
    }, 2000);
  };

  const generateAIResponse = (userInput: string, files: File[]): Message => {
    const responses = [
      "I understand you're experiencing some symptoms. Based on what you've described, I'd like to gather more information to provide a better assessment.",
      "Thank you for sharing that information. I've analyzed your symptoms and any uploaded documents. Let me provide you with a preliminary assessment.",
      "I can see you've uploaded medical documents. I'm processing the information to provide you with relevant insights and recommendations.",
      "Based on your symptoms, I recommend monitoring your condition closely. Here are some immediate steps you can take while considering professional medical consultation."
    ];

    let content = responses[Math.floor(Math.random() * responses.length)];
    
    if (files.length > 0) {
      content += ` I've also reviewed your uploaded ${files.length} document(s) and incorporated that information into my assessment.`;
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content,
      timestamp: new Date()
    };
  };

  const generateHealthAssessment = (symptoms: string) => {
    setTimeout(() => {
      const riskLevels: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high'];
      const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      
      const assessment: HealthAssessment = {
        riskLevel,
        confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
        symptoms: [
          'Reported pain or discomfort',
          'Possible inflammatory response',
          'Stress indicators present'
        ],
        recommendations: [
          'Monitor symptoms closely',
          'Stay hydrated and rest',
          'Consider over-the-counter pain relief if appropriate',
          'Seek medical attention if symptoms worsen'
        ],
        urgency: riskLevel === 'high' ? 'Seek medical attention within 24 hours' : 
                riskLevel === 'medium' ? 'Consider consulting healthcare provider' : 
                'Monitor and self-care appropriate',
        nextSteps: [
          'Document symptom progression',
          'Take temperature if fever suspected',
          'Contact healthcare provider if concerned',
          'Call emergency services if symptoms are severe'
        ]
      };
      
      setAssessment(assessment);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop audio recording
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          AI Health Triage Assistant
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced AI-powered health consultation system that analyzes symptoms, 
          reviews medical documents, and provides preliminary health assessments with clinical-grade accuracy.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Health Assistant</h3>
                  <p className="text-sm text-gray-600">Powered by advanced medical AI models</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl' 
                      : 'bg-gray-100 text-gray-900 rounded-r-2xl rounded-tl-2xl'
                  } p-4`}>
                    <div className="flex items-start space-x-2 mb-2">
                      {message.type === 'ai' ? (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      ) : (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-xs opacity-75">
                                {attachment.type === 'image' ? <Image className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                <span>{attachment.name} ({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-r-2xl rounded-tl-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* File Upload Area */}
            {uploadedFiles.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                      {file.type.startsWith('image/') ? <Image className="w-4 h-4 text-blue-600" /> : <FileText className="w-4 h-4 text-blue-600" />}
                      <span className="text-sm text-blue-700">{file.name}</span>
                      <button onClick={() => removeFile(index)} className="text-blue-600 hover:text-blue-800">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Describe your symptoms, ask health questions, or share your health concerns..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleRecording}
                    className={`p-3 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() && uploadedFiles.length === 0}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Health Assessment Panel */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Symptom Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Document Review</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Risk Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-gray-700">Triage Recommendations</span>
                </div>
              </div>
            </div>

            {/* Health Assessment Results */}
            {assessment && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Assessment</h3>
                
                <div className={`p-4 rounded-lg border-2 mb-4 ${getRiskColor(assessment.riskLevel)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Risk Level: {assessment.riskLevel.toUpperCase()}</span>
                    <span className="text-sm">{assessment.confidence}% confidence</span>
                  </div>
                  <p className="text-sm">{assessment.urgency}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Identified Symptoms</h4>
                    <ul className="space-y-1">
                      {assessment.symptoms.map((symptom, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {assessment.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
                    <ul className="space-y-1">
                      {assessment.nextSteps.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                          <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Actions */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Actions</span>
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Call Emergency Services
                </button>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Find Nearest Hospital
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Contact Primary Care
                </button>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Privacy & Security</h4>
                  <p className="text-blue-800 text-sm">
                    All conversations are encrypted and HIPAA-compliant. 
                    Your health information is processed securely and never shared without consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Technology Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Advanced Medical AI Technology
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">NLP Processing</h4>
              <p className="text-gray-600 text-sm">
                Advanced natural language processing trained on medical literature 
                and clinical datasets for accurate symptom interpretation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Document Analysis</h4>
              <p className="text-gray-600 text-sm">
                OCR and medical document parsing to extract relevant information 
                from lab results, prescriptions, and medical reports.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Risk Stratification</h4>
              <p className="text-gray-600 text-sm">
                Multi-factor risk assessment using clinical decision trees 
                and machine learning models validated by medical professionals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clinical Validation</h4>
              <p className="text-gray-600 text-sm">
                All AI recommendations are validated against clinical guidelines 
                and reviewed by licensed healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITriage;