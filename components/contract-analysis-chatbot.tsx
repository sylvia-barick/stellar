"use client"

import { useState, useRef, useEffect } from "react"
import {
    Send, Bot, User, AlertTriangle, FileText, Sparkles, Loader2,
    CheckCircle2, ShieldCheck, Hash, History
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Message {
    id: string
    role: "assistant" | "user"
    content: string
    type?: "text" | "risk-report" | "summary"
    txHash?: string // For audit trail simulation
}

export function ContractAnalysisChatbot() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [analyzingRisks, setAnalyzingRisks] = useState(false)
    const [isVerified, setIsVerified] = useState(true) // Simulating verified document
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Load messages from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("chat-messages")
        if (saved) {
            setMessages(JSON.parse(saved))
        } else {
            setMessages([
                {
                    id: "1",
                    role: "assistant",
                    content: "Hello! I'm your AI Legal Advisor. Upload a contract to get started, or ask me questions about international trade regulations.",
                    type: "text",
                },
            ])
        }
    }, [])

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chat-messages", JSON.stringify(messages))
        }
    }, [messages])

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const response = generateResponse(input)
            // Generate a fake Stellar transaction hash for the audit log
            const fakeTxHash = "e890...4a2b";

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: response,
                    type: "text",
                    txHash: fakeTxHash // Attach hash
                },
            ])
            setIsLoading(false)
        }, 1500)
    }

    const generateResponse = (query: string): string => {
        const lowerQuery = query.toLowerCase()

        // Contract Specific Terms
        if (lowerQuery.includes("liability") || lowerQuery.includes("cap") || lowerQuery.includes("indemnification")) {
            return "Based on the contract analysis, the total liability is capped at 100% of the contract value. However, there are exceptions for gross negligence and willful misconduct where liability is unlimited. Indemnification clauses cover third-party claims related to IP infringement."
        }
        if (lowerQuery.includes("termination") || lowerQuery.includes("cancel") || lowerQuery.includes("end")) {
            return "The termination clause allows either party to terminate with 30 days' written notice. Immediate termination is permitted for material breach that remains uncured for 14 days. Upon termination, all outstanding payments become immediately due."
        }
        if (lowerQuery.includes("payment") || lowerQuery.includes("terms") || lowerQuery.includes("invoice") || lowerQuery.includes("cost")) {
            return "Payment terms are Net 30 days from the invoice date. Late payments incur interest at 1.5% per month. The currency for all transactions is defined as USD."
        }
        if (lowerQuery.includes("shipping") || lowerQuery.includes("delivery") || lowerQuery.includes("incoterms") || lowerQuery.includes("freight")) {
            return "Shipping terms are Incoterms 2020 CIF (Cost, Insurance, and Freight). Risk transfers to the buyer once the goods are loaded on the vessel at the port of shipment. The seller is responsible for insurance during transit."
        }
        if (lowerQuery.includes("confidential") || lowerQuery.includes("privacy") || lowerQuery.includes("data")) {
            return "The confidentiality agreement is mutual and lasts for a duration of 5 years post-termination. It covers all technical data, financial information, and business strategies disclosed during the term."
        }
        if (lowerQuery.includes("law") || lowerQuery.includes("jurisdiction") || lowerQuery.includes("dispute")) {
            return "This agreement is governed by the laws of Singapore. Any disputes arising shall be settled via arbitration at the Singapore International Arbitration Centre (SIAC)."
        }
        if (lowerQuery.includes("warranty") || lowerQuery.includes("guarantee")) {
            return "The provider warrants that services will be performed in a professional manner consistent with industry standards. The warranty period for delivered goods is 12 months from acceptance."
        }
        if (lowerQuery.includes("force majeure") || lowerQuery.includes("unforeseen")) {
            return "A Force Majeure clause is currently missing from the highlighted risk section. This is a critical omission that leaves parties potential liabilities during unforeseen events like pandemics or natural disasters."
        }

        // Website / Platform / Stellar Questions
        if (lowerQuery.includes("nexus-shield") || lowerQuery.includes("website") || lowerQuery.includes("platform") || lowerQuery.includes("app")) {
            return "Nexus-Shield is a next-generation Contract Lifecycle Management (CLM) platform. It integrates AI for legal risk analysis and the Stellar blockchain for immutable contract anchoring and security."
        }
        if (lowerQuery.includes("stellar") || lowerQuery.includes("blockchain") || lowerQuery.includes("crypto") || lowerQuery.includes("wallet")) {
            return "We use the Stellar blockchain to 'anchor' contract hashes. This creates a tamper-proof digital fingerprint of your document. We support wallets like Freighter, Albedo, and xBull for secure signing."
        }
        if (lowerQuery.includes("ai") || lowerQuery.includes("intelligence") || lowerQuery.includes("robot") || lowerQuery.includes("bot")) {
            return "My AI core is designed to assist with 'Contract Intelligence'. I can detect jurisdictional risks, extract multi-lingual clauses, and answer contextual questions about your uploaded documents."
        }
        if (lowerQuery.includes("audit") || lowerQuery.includes("trail") || lowerQuery.includes("history")) {
            return "The 'Audit Trail' feature tracks every action taken on a contract (drafting, viewing, signing). These events are hashed and recorded on the Stellar ledger for complete transparency."
        }
        if (lowerQuery.includes("team") || lowerQuery.includes("collaborate") || lowerQuery.includes("user")) {
            return "Team management features allowing for multi-user collaboration and role-based access control are coming soon to the platform."
        }

        // General / Greetings
        if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
            return "Hello! I am ready to assist you with your contract analysis. You can ask me about specific clauses, risks, or platform features."
        }
        if (lowerQuery.includes("help") || lowerQuery.includes("support")) {
            return "I can help you interpret contract terms. Try asking things like: 'What is the liability cap?', 'How can I terminate the contract?', or 'How does the blockchain integration work?'"
        }
        if (lowerQuery.includes("thank") || lowerQuery.includes("thanks")) {
            return "You're welcome! Let me know if you have any other questions about your contract or Nexus-Shield."
        }

        // Fallback
        return "I'm not sure I found that specific information in the current document context or knowledge base. Could you try rephrasing your question? You can ask about liabilities, termination, payment terms, or shipping regulations."
    }

    const handleQuickSummary = () => {
        setIsLoading(true)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Here is a quick summary of the active contract:",
                    type: "summary",
                    txHash: "7f3a...91bc" // Fake hash
                },
            ])
            setIsLoading(false)
        }, 1500)
    }

    const handleRiskAnalysis = () => {
        setAnalyzingRisks(true)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "I have analyzed the contract for potential risks. Here is what I found:",
                    type: "risk-report",
                    txHash: "2c8d...56ef" // Fake hash
                },
            ])
            setAnalyzingRisks(false)
        }, 2000)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[400px]">
            {/* Sidebar / Context Panel */}
            <Card className="lg:col-span-1 border-border flex flex-col h-full bg-card/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        Contract Intelligence
                    </CardTitle>
                    <CardDescription>AI-powered legal assistant</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    {/* Active Document with Verification Badge */}
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3 border border-border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-medium">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                Active Document
                            </div>
                            {isVerified && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 gap-1 border-green-500/20">
                                    <ShieldCheck className="h-3 w-3" />
                                    Verified
                                </Badge>
                            )}
                        </div>
                        <div className="text-sm font-medium truncate">Global_Trade_Agreement_v2.pdf</div>

                        {/* Blockchain Hash Display */}
                        <div className="text-[10px] font-mono text-muted-foreground break-all p-2 bg-background/50 rounded border border-border/50">
                            <div className="flex items-center gap-1 mb-1 text-xs text-primary">
                                <Hash className="h-3 w-3" /> Stellar Hash
                            </div>
                            8f14e45f...9d2a
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
                        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleQuickSummary} disabled={isLoading}>
                            <Sparkles className="h-4 w-4" />
                            Generate Summary
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleRiskAnalysis} disabled={analyzingRisks}>
                            <AlertTriangle className="h-4 w-4" />
                            Detect Risks
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Stats</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-muted/30 rounded border border-border text-center">
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Clauses</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded border border-border text-center">
                                <div className="text-2xl font-bold text-amber-500">2</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Risks</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 border-border flex flex-col h-full shadow-lg overflow-hidden bg-card/60 backdrop-blur-sm">
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}
                `}>
                                {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>

                            <div className={`
                  flex-1 max-w-[80%] space-y-1
                  ${message.role === "user" ? "items-end flex flex-col" : ""}
                `}>
                                <div className={`
                    p-4 rounded-lg text-sm leading-relaxed shadow-sm
                    ${message.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-card border border-border rounded-tl-none"}
                  `}>
                                    {message.content}
                                </div>

                                {/* Audit Trail Log Indicator */}
                                {message.txHash && (
                                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground animate-in fade-in duration-700">
                                        <History className="h-3 w-3" />
                                        <span>Logged to Stellar Audit Trail</span>
                                        <Badge variant="outline" className="text-[10px] h-4 px-1 py-0 gap-1 font-mono">
                                            <Hash className="h-2 w-2" /> {message.txHash}
                                        </Badge>
                                    </div>
                                )}

                                {message.type === "summary" && (
                                    <div className="w-full space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                        <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-3">
                                            <div className="font-semibold flex items-center gap-2">
                                                <FileText className="h-4 w-4" /> Service Agreement Summary
                                            </div>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> <span className="text-foreground">Parties:</span> Nexus Tech Ltd. (Provider) & Global Corp (Client)</li>
                                                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> <span className="text-foreground">Duration:</span> 24 months, auto-renewing</li>
                                                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> <span className="text-foreground">Value:</span> $150,000 USD annually</li>
                                                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> <span className="text-foreground">Governing Law:</span> Singapore International Arbitration Centre</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {message.type === "risk-report" && (
                                    <div className="w-full space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
                                        <div className="font-semibold text-destructive flex items-center gap-2 mb-2">
                                            <AlertTriangle className="h-4 w-4" /> Risks Detected
                                        </div>
                                        <div className="grid gap-3">
                                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                                <div className="font-medium text-destructive mb-1 text-xs uppercase tracking-wider">High Risk • Missing Clause</div>
                                                <div className="text-sm font-semibold mb-1">Force Majeure Missing</div>
                                                <div className="text-xs text-muted-foreground">The contract lacks a Force Majeure clause, leaving parties vulnerable to unforeseen events like pandemics or natural disasters.</div>
                                            </div>
                                            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                                <div className="font-medium text-amber-600 dark:text-amber-500 mb-1 text-xs uppercase tracking-wider">Medium Risk • Ambiguity</div>
                                                <div className="text-sm font-semibold mb-1">Undefined Delivery Timeline</div>
                                                <div className="text-xs text-muted-foreground">Clause 4.2 states "delivery in reasonable time" without specifying strict deadlines or penalty for delay.</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicators */}
                    {(isLoading || analyzingRisks) && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div className="bg-card border border-border p-4 rounded-lg rounded-tl-none flex items-center gap-2 shadow-sm">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    {analyzingRisks ? "Scanning contract for compliance risks..." : "Analyzing..."}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <CardFooter className="p-4 border-t border-border bg-card/50">
                    <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <Input
                            placeholder="Ask about liabilities, termination, or payment terms..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>

        </div>
    )
}
