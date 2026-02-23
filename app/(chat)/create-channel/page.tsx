'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Lock, Plus, Image as ImageIcon, X, Trash2 } from 'lucide-react'

interface Question {
    id: string
    text: string
    options: string[]
}

export default function CreateChannelPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [privacy, setPrivacy] = useState<'public' | 'private'>('public')
    const [questions, setQuestions] = useState<Question[]>([
        { id: '1', text: 'Which department do you work in?', options: ['Engineering', 'Design', ''] }
    ])

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now().toString(), text: '', options: ['', '', ''] }])
    }

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id))
    }

    const updateQuestionText = (id: string, text: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text } : q))
    }

    const updateOptionText = (qId: string, index: number, text: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...q.options]
                newOptions[index] = text
                return { ...q, options: newOptions }
            }
            return q
        }))
    }

    const addOption = (qId: string) => {
        setQuestions(questions.map(q => q.id === qId ? { ...q, options: [...q.options, ''] } : q))
    }

    return (
        <div className="flex-1 bg-neutral-50/30 overflow-y-auto">
            <div className="max-w-2xl mx-auto py-12 px-6">
                <div className="bg-white rounded-[32px] shadow-sm border border-neutral-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-neutral-100 flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-neutral-50 rounded-xl transition-colors text-neutral-400 hover:text-neutral-600"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold text-neutral-900">Create Channel</h1>
                    </div>

                    <div className="p-10 space-y-10">
                        {/* Channel Name */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-neutral-900">Channel Name</label>
                            <input
                                type="text"
                                placeholder="e.g. product-design"
                                value={name}
                                onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                className="w-full px-5 py-4 bg-white border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm placeholder:text-neutral-300"
                            />
                            <p className="text-[11px] text-neutral-400 font-medium">
                                Names must be lowercase, without spaces. They can contain hyphens.
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-neutral-900">
                                    Description <span className="text-neutral-400 font-medium">(Optional)</span>
                                </label>
                                <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                                    {description.length}/250
                                </span>
                            </div>
                            <textarea
                                placeholder="What's this channel about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, 250))}
                                rows={4}
                                className="w-full px-5 py-4 bg-white border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm placeholder:text-neutral-300 resize-none"
                            />
                        </div>

                        {/* Privacy Toggle */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-neutral-900">Privacy</label>
                            <div className="p-1.5 bg-neutral-50 rounded-2xl flex items-center gap-1.5">
                                <button
                                    onClick={() => setPrivacy('public')}
                                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${privacy === 'public'
                                            ? 'bg-[#26D6EB] text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100/50'
                                        }`}
                                >
                                    Public
                                </button>
                                <button
                                    onClick={() => setPrivacy('private')}
                                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${privacy === 'private'
                                            ? 'bg-[#26D6EB] text-white shadow-lg shadow-cyan-500/20'
                                            : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100/50'
                                        }`}
                                >
                                    <Lock size={16} /> Private
                                </button>
                            </div>
                            <p className="text-[11px] text-neutral-400 font-medium">
                                {privacy === 'public'
                                    ? "Public channels can be found and joined by anyone in the organization."
                                    : "Private channels can only be viewed or joined by invitation."
                                }
                            </p>
                        </div>

                        {/* Join Request Questions (Private Only) */}
                        {privacy === 'private' && (
                            <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-bold text-neutral-900">Join Request Questions</label>
                                    <span className="text-[10px] text-neutral-400 font-medium">Members must answer these before joining</span>
                                </div>

                                <div className="space-y-6">
                                    {questions.map((q, qIndex) => (
                                        <div key={q.id} className="p-8 border border-neutral-100 rounded-3xl space-y-6 relative group">
                                            <button
                                                onClick={() => removeQuestion(q.id)}
                                                className="absolute top-4 right-4 p-2 text-neutral-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            <div className="space-y-3">
                                                <span className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">Question {qIndex + 1}</span>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your question here..."
                                                    value={q.text}
                                                    onChange={(e) => updateQuestionText(q.id, e.target.value)}
                                                    className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-100 rounded-xl focus:outline-none focus:border-indigo-500 text-sm font-semibold"
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Response Options</span>
                                                <div className="space-y-3">
                                                    {q.options.map((opt, oIndex) => (
                                                        <div key={oIndex} className="flex items-center gap-4">
                                                            <div className="w-5 h-5 rounded-full border-2 border-neutral-200 shrink-0" />
                                                            <input
                                                                type="text"
                                                                placeholder={`Option ${oIndex + 1}`}
                                                                value={opt}
                                                                onChange={(e) => updateOptionText(q.id, oIndex, e.target.value)}
                                                                className="flex-1 bg-transparent border-b border-neutral-100 py-1 text-sm focus:border-indigo-500 focus:outline-none"
                                                            />
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => addOption(q.id)}
                                                        className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 pt-2"
                                                    >
                                                        <Plus size={14} /> Add option
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={addQuestion}
                                        className="w-full py-5 border-2 border-dashed border-indigo-100 rounded-2xl text-indigo-500 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <Plus size={18} /> Add Question
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Channel Icon */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-neutral-900">Channel Icon</label>
                            <div className="border-2 border-dashed border-neutral-100 rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                                <div className="w-16 h-16 rounded-[24px] bg-neutral-50 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-xl transition-all">
                                    <ImageIcon size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-neutral-900">Click to upload or drag and drop</p>
                                    <p className="text-[11px] text-neutral-400 font-medium tracking-wide">SVG, PNG, JPG or GIF (max. 2MB)</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="pt-6 space-y-4">
                            <button className="w-full py-5 bg-[#4F46E5] text-white rounded-2xl font-bold text-lg hover:bg-[#4338CA] transition-all shadow-xl shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] active:brightness-95">
                                Create Channel
                            </button>
                            <button
                                onClick={() => router.back()}
                                className="w-full py-4 text-neutral-400 hover:text-neutral-600 font-bold text-sm transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes slide-down {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
