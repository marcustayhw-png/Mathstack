export type Formula = {
  name: string;
  latex: string;
  note?: string;
  examProvided?: boolean;
};

export type FormulaSection = {
  topic: string;
  color: string;
  textColor: string;
  formulas: Formula[];
};

// ─── E MATH (4048) ───────────────────────────────────────────────────────────

export const EMATH_FORMULAS: FormulaSection[] = [
  {
    topic: "Compound Interest",
    color: "bg-blue-500/10",
    textColor: "text-blue-600",
    formulas: [
      {
        name: "Total Amount",
        latex: "A = P\\left(1 + \\dfrac{r}{100}\\right)^n",
        note: "P = principal, r = rate per period (%), n = number of periods",
        examProvided: true,
      },
      {
        name: "Simple Interest",
        latex: "I = \\dfrac{P \\times r \\times t}{100}",
        note: "P = principal, r = rate per year (%), t = time in years",
      },
    ],
  },
  {
    topic: "Algebra",
    color: "bg-green-500/10",
    textColor: "text-green-600",
    formulas: [
      {
        name: "Quadratic Formula",
        latex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        note: "For ax² + bx + c = 0",
      },
      {
        name: "Difference of Two Squares",
        latex: "a^2 - b^2 = (a+b)(a-b)",
      },
      {
        name: "Perfect Square (sum)",
        latex: "(a+b)^2 = a^2 + 2ab + b^2",
      },
      {
        name: "Perfect Square (difference)",
        latex: "(a-b)^2 = a^2 - 2ab + b^2",
      },
      {
        name: "Laws of Indices",
        latex: "a^m \\times a^n = a^{m+n}, \\quad a^m \\div a^n = a^{m-n}, \\quad (a^m)^n = a^{mn}",
      },
      {
        name: "Negative Index",
        latex: "a^{-n} = \\dfrac{1}{a^n}",
      },
      {
        name: "Fractional Index",
        latex: "a^{\\frac{1}{n}} = \\sqrt[n]{a}, \\quad a^{\\frac{m}{n}} = \\sqrt[n]{a^m}",
      },
      {
        name: "Zero and One Index",
        latex: "a^0 = 1, \\quad a^1 = a",
      },
    ],
  },
  {
    topic: "Geometry & Angles",
    color: "bg-violet-500/10",
    textColor: "text-violet-600",
    formulas: [
      {
        name: "Angle Sum in Triangle",
        latex: "A + B + C = 180^\\circ",
      },
      {
        name: "Sum of Interior Angles of Polygon",
        latex: "S = (n-2) \\times 180^\\circ",
        note: "n = number of sides",
      },
      {
        name: "Each Interior Angle (regular polygon)",
        latex: "\\theta = \\dfrac{(n-2) \\times 180^\\circ}{n}",
      },
      {
        name: "Sum of Exterior Angles",
        latex: "\\sum \\text{exterior angles} = 360^\\circ",
      },
    ],
  },
  {
    topic: "Mensuration",
    color: "bg-purple-500/10",
    textColor: "text-purple-600",
    formulas: [
      {
        name: "Area of Triangle",
        latex: "A = \\dfrac{1}{2}bh",
        note: "b = base, h = perpendicular height",
      },
      {
        name: "Area of Triangle (SAS)",
        latex: "A = \\dfrac{1}{2}ab\\sin C",
        note: "a, b = two sides, C = included angle",
        examProvided: true,
      },
      {
        name: "Area of Parallelogram",
        latex: "A = bh",
      },
      {
        name: "Area of Trapezium",
        latex: "A = \\dfrac{1}{2}(a+b)h",
        note: "a, b = parallel sides, h = height",
      },
      {
        name: "Circumference of Circle",
        latex: "C = 2\\pi r = \\pi d",
      },
      {
        name: "Area of Circle",
        latex: "A = \\pi r^2",
      },
      {
        name: "Arc Length",
        latex: "l = r\\theta",
        note: "θ in radians",
        examProvided: true,
      },
      {
        name: "Sector Area",
        latex: "A = \\dfrac{1}{2}r^2\\theta",
        note: "θ in radians",
        examProvided: true,
      },
      {
        name: "Area of Segment",
        latex: "A = \\dfrac{1}{2}r^2(\\theta - \\sin\\theta)",
        note: "θ in radians",
      },
      {
        name: "Curved Surface Area of Cone",
        latex: "A = \\pi r l",
        note: "l = slant height",
        examProvided: true,
      },
      {
        name: "Total Surface Area of Cone",
        latex: "A = \\pi r l + \\pi r^2",
      },
      {
        name: "Surface Area of Sphere",
        latex: "A = 4\\pi r^2",
        examProvided: true,
      },
      {
        name: "Volume of Prism / Cylinder",
        latex: "V = A_{\\text{base}} \\times h",
      },
      {
        name: "Volume of Cone",
        latex: "V = \\dfrac{1}{3}\\pi r^2 h",
        examProvided: true,
      },
      {
        name: "Volume of Sphere",
        latex: "V = \\dfrac{4}{3}\\pi r^3",
        examProvided: true,
      },
      {
        name: "Volume of Pyramid",
        latex: "V = \\dfrac{1}{3} \\times A_{\\text{base}} \\times h",
      },
    ],
  },
  {
    topic: "Coordinate Geometry",
    color: "bg-yellow-500/10",
    textColor: "text-yellow-600",
    formulas: [
      {
        name: "Gradient",
        latex: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}",
      },
      {
        name: "Length of Line Segment",
        latex: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
      },
      {
        name: "Equation of Straight Line",
        latex: "y = mx + c",
      },
      {
        name: "Perpendicular Lines",
        latex: "m_1 \\times m_2 = -1",
        note: "Two lines are perpendicular if the product of their gradients is −1",
      },
      {
        name: "Parallel Lines",
        latex: "m_1 = m_2",
        note: "Parallel lines have equal gradients",
      },
    ],
  },
  {
    topic: "Trigonometry",
    color: "bg-orange-500/10",
    textColor: "text-orange-600",
    formulas: [
      {
        name: "Basic Trig Ratios (SOH-CAH-TOA)",
        latex: "\\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}}, \\quad \\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}}, \\quad \\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}",
      },
      {
        name: "Pythagoras' Theorem",
        latex: "a^2 + b^2 = c^2",
        note: "c = hypotenuse",
      },
      {
        name: "Exact Values",
        latex: "\\sin 30^\\circ = \\tfrac{1}{2},\\ \\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2},\\ \\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}}",
      },
      {
        name: "Exact Values (45°)",
        latex: "\\sin 45^\\circ = \\tfrac{1}{\\sqrt{2}},\\ \\cos 45^\\circ = \\tfrac{1}{\\sqrt{2}},\\ \\tan 45^\\circ = 1",
      },
      {
        name: "Exact Values (60°)",
        latex: "\\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2},\\ \\cos 60^\\circ = \\tfrac{1}{2},\\ \\tan 60^\\circ = \\sqrt{3}",
      },
      {
        name: "Sine Rule",
        latex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}",
        examProvided: true,
      },
      {
        name: "Cosine Rule",
        latex: "a^2 = b^2 + c^2 - 2bc\\cos A",
        examProvided: true,
      },
      {
        name: "Radian Conversion",
        latex: "\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\dfrac{\\pi}{180}",
      },
    ],
  },
  {
    topic: "Vectors",
    color: "bg-cyan-500/10",
    textColor: "text-cyan-600",
    formulas: [
      {
        name: "Magnitude of Vector",
        latex: "|\\mathbf{a}| = \\left|\\begin{pmatrix}x\\\\y\\end{pmatrix}\\right| = \\sqrt{x^2 + y^2}",
      },
      {
        name: "Unit Vector",
        latex: "\\hat{\\mathbf{a}} = \\dfrac{\\mathbf{a}}{|\\mathbf{a}|}",
      },
      {
        name: "Vector Addition",
        latex: "\\mathbf{a} + \\mathbf{b} = \\begin{pmatrix}a_1 + b_1\\\\ a_2 + b_2\\end{pmatrix}",
      },
    ],
  },
  {
    topic: "Statistics",
    color: "bg-red-500/10",
    textColor: "text-red-600",
    formulas: [
      {
        name: "Mean (ungrouped)",
        latex: "\\bar{x} = \\dfrac{\\sum x}{n}",
      },
      {
        name: "Mean (grouped data)",
        latex: "\\bar{x} = \\dfrac{\\sum fx}{\\sum f}",
        examProvided: true,
      },
      {
        name: "Standard Deviation (ungrouped)",
        latex: "\\sigma = \\sqrt{\\dfrac{\\sum x^2}{n} - \\bar{x}^2}",
      },
      {
        name: "Standard Deviation (grouped)",
        latex: "\\sigma = \\sqrt{\\dfrac{\\sum fx^2}{\\sum f} - \\left(\\dfrac{\\sum fx}{\\sum f}\\right)^2}",
        examProvided: true,
      },
      {
        name: "Interquartile Range",
        latex: "\\text{IQR} = Q_3 - Q_1",
      },
    ],
  },
  {
    topic: "Probability",
    color: "bg-pink-500/10",
    textColor: "text-pink-600",
    formulas: [
      {
        name: "Basic Probability",
        latex: "P(A) = \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}",
      },
      {
        name: "Complement Rule",
        latex: "P(A') = 1 - P(A)",
      },
      {
        name: "Addition Rule",
        latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      },
      {
        name: "Mutually Exclusive Events",
        latex: "P(A \\cup B) = P(A) + P(B)",
        note: "When A and B cannot both occur",
      },
      {
        name: "Independent Events",
        latex: "P(A \\cap B) = P(A) \\times P(B)",
        note: "When A and B do not affect each other",
      },
    ],
  },
];

// ─── A MATH (4049) ───────────────────────────────────────────────────────────

export const AMATH_FORMULAS: FormulaSection[] = [
  {
    topic: "Algebra",
    color: "bg-emerald-500/10",
    textColor: "text-emerald-600",
    formulas: [
      {
        name: "Quadratic Formula",
        latex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        note: "For ax² + bx + c = 0",
        examProvided: true,
      },
      {
        name: "Discriminant",
        latex: "\\Delta = b^2 - 4ac",
        note: "Δ > 0: two distinct real roots  |  Δ = 0: two equal roots  |  Δ < 0: no real roots",
      },
      {
        name: "Sum and Product of Roots",
        latex: "\\alpha + \\beta = -\\dfrac{b}{a}, \\quad \\alpha\\beta = \\dfrac{c}{a}",
        note: "α and β are roots of ax² + bx + c = 0",
      },
      {
        name: "Completing the Square",
        latex: "ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 + c - \\dfrac{b^2}{4a}",
      },
      {
        name: "Binomial Expansion",
        latex: "(a+b)^n = \\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r",
        examProvided: true,
      },
      {
        name: "General Term of Binomial",
        latex: "T_{r+1} = \\binom{n}{r}a^{n-r}b^r",
      },
      {
        name: "Surds: Rationalising Denominator",
        latex: "\\dfrac{a}{\\sqrt{b}} = \\dfrac{a\\sqrt{b}}{b}, \\quad \\dfrac{a}{\\sqrt{b}+\\sqrt{c}} = \\dfrac{a(\\sqrt{b}-\\sqrt{c})}{b-c}",
      },
      {
        name: "Difference of Cubes",
        latex: "a^3 - b^3 = (a-b)(a^2+ab+b^2)",
      },
      {
        name: "Sum of Cubes",
        latex: "a^3 + b^3 = (a+b)(a^2-ab+b^2)",
      },
    ],
  },
  {
    topic: "Logarithms & Exponentials",
    color: "bg-teal-500/10",
    textColor: "text-teal-600",
    formulas: [
      {
        name: "Log–Exponential Equivalence",
        latex: "y = a^x \\iff x = \\log_a y",
      },
      {
        name: "Log of Product",
        latex: "\\log_a(xy) = \\log_a x + \\log_a y",
      },
      {
        name: "Log of Quotient",
        latex: "\\log_a\\left(\\dfrac{x}{y}\\right) = \\log_a x - \\log_a y",
      },
      {
        name: "Log of Power",
        latex: "\\log_a(x^n) = n\\log_a x",
      },
      {
        name: "Change of Base",
        latex: "\\log_a b = \\dfrac{\\ln b}{\\ln a} = \\dfrac{\\log b}{\\log a}",
      },
      {
        name: "Natural Log Identity",
        latex: "\\ln(e^x) = x, \\quad e^{\\ln x} = x",
      },
    ],
  },
  {
    topic: "Trigonometry Identities",
    color: "bg-pink-500/10",
    textColor: "text-pink-600",
    formulas: [
      {
        name: "Pythagorean Identity",
        latex: "\\sin^2 A + \\cos^2 A = 1",
        examProvided: true,
      },
      {
        name: "Secant Identity",
        latex: "\\sec^2 A = 1 + \\tan^2 A",
        examProvided: true,
      },
      {
        name: "Cosecant Identity",
        latex: "\\csc^2 A = 1 + \\cot^2 A",
        examProvided: true,
      },
      {
        name: "Reciprocal Identities",
        latex: "\\sec A = \\dfrac{1}{\\cos A}, \\quad \\csc A = \\dfrac{1}{\\sin A}, \\quad \\cot A = \\dfrac{1}{\\tan A}",
      },
      {
        name: "tan in terms of sin/cos",
        latex: "\\tan A = \\dfrac{\\sin A}{\\cos A}",
      },
      {
        name: "Compound Angle (sin)",
        latex: "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B",
        examProvided: true,
      },
      {
        name: "Compound Angle (cos)",
        latex: "\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B",
        examProvided: true,
      },
      {
        name: "Compound Angle (tan)",
        latex: "\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}",
        examProvided: true,
      },
      {
        name: "Double Angle (sin)",
        latex: "\\sin 2A = 2\\sin A\\cos A",
        examProvided: true,
      },
      {
        name: "Double Angle (cos)",
        latex: "\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A",
        examProvided: true,
      },
      {
        name: "Double Angle (tan)",
        latex: "\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}",
        examProvided: true,
      },
      {
        name: "R-formula (sin)",
        latex: "a\\sin\\theta + b\\cos\\theta = R\\sin(\\theta + \\alpha)",
        note: "R = √(a²+b²), tan α = b/a",
      },
      {
        name: "R-formula (cos)",
        latex: "a\\cos\\theta + b\\sin\\theta = R\\cos(\\theta - \\alpha)",
        note: "R = √(a²+b²), tan α = b/a",
      },
    ],
  },
  {
    topic: "Coordinate Geometry",
    color: "bg-indigo-500/10",
    textColor: "text-indigo-600",
    formulas: [
      {
        name: "Circle (centre-radius form)",
        latex: "(x-a)^2 + (y-b)^2 = r^2",
        note: "Centre (a, b), radius r",
      },
      {
        name: "Circle (general form)",
        latex: "x^2 + y^2 + 2gx + 2fy + c = 0",
        note: "Centre (−g, −f), radius = √(g² + f² − c)",
      },
      {
        name: "Midpoint",
        latex: "M = \\left(\\dfrac{x_1+x_2}{2},\\ \\dfrac{y_1+y_2}{2}\\right)",
      },
      {
        name: "Area of Triangle (coordinates)",
        latex: "A = \\dfrac{1}{2}\\left|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)\\right|",
      },
      {
        name: "Perpendicular Lines",
        latex: "m_1 \\times m_2 = -1",
      },
    ],
  },
  {
    topic: "Differentiation",
    color: "bg-red-500/10",
    textColor: "text-red-600",
    formulas: [
      {
        name: "Power Rule",
        latex: "\\dfrac{d}{dx}(x^n) = nx^{n-1}",
      },
      {
        name: "Chain Rule",
        latex: "\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}",
      },
      {
        name: "Product Rule",
        latex: "\\dfrac{d}{dx}(uv) = u\\dfrac{dv}{dx} + v\\dfrac{du}{dx}",
      },
      {
        name: "Quotient Rule",
        latex: "\\dfrac{d}{dx}\\left(\\dfrac{u}{v}\\right) = \\dfrac{v\\,u' - u\\,v'}{v^2}",
      },
      {
        name: "Derivatives of Trig",
        latex: "\\dfrac{d}{dx}(\\sin x) = \\cos x,\\ \\dfrac{d}{dx}(\\cos x) = -\\sin x,\\ \\dfrac{d}{dx}(\\tan x) = \\sec^2 x",
      },
      {
        name: "Derivative of eˣ and ln x",
        latex: "\\dfrac{d}{dx}(e^x) = e^x, \\quad \\dfrac{d}{dx}(\\ln x) = \\dfrac{1}{x}",
      },
      {
        name: "Kinematics",
        latex: "v = \\dfrac{ds}{dt}, \\quad a = \\dfrac{dv}{dt} = \\dfrac{d^2s}{dt^2}",
        note: "s = displacement, v = velocity, a = acceleration",
      },
    ],
  },
  {
    topic: "Integration",
    color: "bg-orange-500/10",
    textColor: "text-orange-600",
    formulas: [
      {
        name: "Power Rule",
        latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
      },
      {
        name: "Integration of (ax+b)ⁿ",
        latex: "\\int (ax+b)^n\\,dx = \\dfrac{(ax+b)^{n+1}}{a(n+1)} + C \\quad (n \\neq -1)",
      },
      {
        name: "Integration of Trig",
        latex: "\\int \\sin x\\,dx = -\\cos x + C, \\quad \\int \\cos x\\,dx = \\sin x + C, \\quad \\int \\sec^2 x\\,dx = \\tan x + C",
      },
      {
        name: "Integration of eˣ and 1/x",
        latex: "\\int e^x\\,dx = e^x + C, \\quad \\int \\dfrac{1}{x}\\,dx = \\ln|x| + C",
      },
      {
        name: "Definite Integral",
        latex: "\\int_a^b f(x)\\,dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a)",
      },
      {
        name: "Area Under Curve",
        latex: "A = \\int_a^b f(x)\\,dx",
        note: "For region above x-axis; take absolute value if below",
      },
    ],
  },
];

// ─── Exam Sheet Content (for the official sheet view) ────────────────────────

export const EMATH_SHEET_SECTIONS = [
  {
    heading: "1. Compound Interest",
    formulas: [
      { name: "Total amount", latex: "A = P\\left(1 + \\dfrac{r}{100}\\right)^n" },
    ],
  },
  {
    heading: "2. Mensuration",
    formulas: [
      { name: "Curved surface area of a cone", latex: "A = \\pi r l" },
      { name: "Surface area of a sphere", latex: "A = 4\\pi r^2" },
      { name: "Volume of a cone", latex: "V = \\dfrac{1}{3}\\pi r^2 h" },
      { name: "Volume of a sphere", latex: "V = \\dfrac{4}{3}\\pi r^3" },
      { name: "Area of triangle ABC", latex: "A = \\dfrac{1}{2}ab\\sin C" },
      { name: "Arc length", latex: "s = r\\theta" },
      { name: "Area of sector", latex: "A = \\dfrac{1}{2}r^2\\theta" },
    ],
  },
  {
    heading: "3. Trigonometry",
    formulas: [
      { name: "Sine rule", latex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}" },
      { name: "Cosine rule", latex: "a^2 = b^2 + c^2 - 2bc\\cos A" },
    ],
  },
  {
    heading: "4. Statistics",
    formulas: [
      { name: "Mean", latex: "\\bar{x} = \\dfrac{\\sum fx}{\\sum f}" },
      { name: "Standard deviation", latex: "\\sigma = \\sqrt{\\dfrac{\\sum fx^2}{\\sum f} - \\left(\\dfrac{\\sum fx}{\\sum f}\\right)^2}" },
    ],
  },
];

export const AMATH_SHEET_SECTIONS = [
  {
    heading: "1. Algebra",
    formulas: [
      { name: "Quadratic equation — for ax² + bx + c = 0:", latex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
      { name: "Binomial expansion", latex: "(a+b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\cdots + b^n" },
      { name: "where n is a positive integer and", latex: "\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!} = \\dfrac{n(n-1)\\cdots(n-r+1)}{r!}" },
    ],
  },
  {
    heading: "2. Trigonometry",
    subheading: "Identities",
    formulas: [
      { name: "", latex: "\\sin^2 A + \\cos^2 A = 1" },
      { name: "", latex: "\\sec^2 A = 1 + \\tan^2 A" },
      { name: "", latex: "\\csc^2 A = 1 + \\cot^2 A" },
      { name: "", latex: "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B" },
      { name: "", latex: "\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B" },
      { name: "", latex: "\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}" },
      { name: "", latex: "\\sin 2A = 2\\sin A\\cos A" },
      { name: "", latex: "\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A" },
      { name: "", latex: "\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}" },
    ],
  },
  {
    heading: "",
    subheading: "Formulae for △ABC",
    formulas: [
      { name: "", latex: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}" },
      { name: "", latex: "a^2 = b^2 + c^2 - 2bc\\cos A" },
      { name: "", latex: "\\Delta = \\dfrac{1}{2}bc\\sin A" },
    ],
  },
];
