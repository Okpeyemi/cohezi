# The Story of Cohezi

## 💡 What Inspired Me?

In a world flooded with generic AI chatbots that simply "answer questions," I felt a critical gap. We have tools that write for us and code for us, but we lack tools that help us **think**.

I was inspired by the concept of a "Red Team" in cybersecurity or a council of advisors for a CEO—a group dedicated to finding flaws, challenging assumptions, and stress-testing ideas before they go live. I wanted to democratize this high-level cognitive audit.

**Cohezi** was born from a simple question: *What if, instead of a compliant assistant, you had a team of specialized agents designed to dissect your decisions and expose your blind spots?* I wanted to visualize the actual structure of reasoning, turning abstract thoughts into a concrete, interactive map of cause and effect.

## 🧠 What Me Learned

Building Cohezi was a masterclass in modern AI orchestration and advanced UI patterns.

*   **The Power of Specialization:** I learned that a single AI prompt is rarely enough for complex analysis. By breaking the "brain" into specialized agents (Logical, Causal, Risk, Skeptic, Stress-Test), the quality of insight improved dramatically.
*   **State Management is Art:** Managing the asynchronous flow of five different AI agents reporting back in real-time, while syncing visuals in a three-panel layout, taught me the true value of robust state management and optimistic UI updates.
*   **Visualizing the Invisible:** I discovered that the biggest challenge in decision-making isn't just the data, but the *visualization* of consequences. Learning to map "Ripple Effects" (second and third-order consequences) visually was a breakthrough in making the AI's output truly useful.

## 🛠️ How I Built My Project

Cohezi is built on a **"Cognitive Triptych" architecture**, dividing the screen (and the code) into three distinct stages of thought: **Intention**, **Arena**, and **Verdict**.

### The Tech Stack
*   **Core Brain:** A hybrid engine using **Gemini 3 Pro Preview** for deep reasoning and agent orchestration, and **Gemini 3 Flash Preview** for final synthesis. This combination ensures maximum analytical depth while maintaining responsiveness. It establishes **cognitive heterogeneity**, preventing the monotony of a single model's reasoning patterns.
*   **Frontend:** Built with **Next.js 16** (Turbopack) and **React 19**. I used **Tailwind CSS 3.4** for rapid styling and **Framer Motion** to create the "Glassmorphism" aesthetic that gives the app its premium, futuristic feel.
*   **UI Structure:** I implemented **`react-resizable-panels`** to give users control over their workspace, allowing them to expand the "Arena" (analysis details) or the "Verdict" (final summary) as needed.
*   **Data & Auth:** **Firebase** handles the backend complexity. Firestore stores user decisions and the detailed JSON reports from agents, while Firebase Auth manages secure, personalized access.

### The Agentic Workflow
The backend isn't just a simple API; it's an orchestrator. When a user submits a decision:
1.  **The Orchestrator:** Analyzes the intent and assigns specific missions.
2.  **The Arena (Parallel Execution):** The **Logical**, **Causal**, and **Risk** agents run in parallel to map the baseline reality.
3.  **The Stress-Test (Recursive Execution):** The **Skeptic** and **Stress-Test** agents take the initial findings and attempt to "break" them, simulating worst-case scenarios and cognitive biases.

## 🏔️ Challenges I Faced

*   **Orchestrating Chaos:** The biggest technical hurdle was managing the `Promise.all` logic for multiple agents. Ensuring that the "Skeptic" agent waited for the "Logical" agent's data—while keeping the UI responsive—required a sophisticated asynchronous architecture in the API route handlers.
*   **The "Yes-Man" Problem:** Early versions of the agents were too polite. They would agree with the user's decision even if it was flawed. I had to rigorously tune the system prompts to force the agents to be critical, contrarian, and unforgiving in their analysis (The "Skeptic Agent" persona).
*   **Information Overload:** With five agents returning detailed reports, the screen quickly became unreadable. Designing the **collapsible "Arena" interface**—where users can dive deep into specific agents or stay high-level—was a crucial UX challenge I solved using Shadcn UI's accordion primitives and careful visual hierarchy.
