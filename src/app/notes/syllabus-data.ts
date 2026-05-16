export type Chapter = {
  id: string;
  title: string;
  code: string;
  strand: string;
  desc: string;
};

export type Subject = "E Math" | "A Math";
export type Level = "sec1" | "sec2" | "sec34";

export const SYLLABUS: Record<Level, Record<Subject | "only", Chapter[]>> = {
  sec1: {
    only: [
      { id: "n1", code: "N1", strand: "Number & Algebra", title: "Numbers and their Operations", desc: "Primes, HCF, LCM, integers, rational numbers, approximation and estimation." },
      { id: "n2", code: "N2", strand: "Number & Algebra", title: "Ratio and Proportion", desc: "Ratios involving rational numbers, simplest form, and problems involving ratio." },
      { id: "n3", code: "N3", strand: "Number & Algebra", title: "Percentage", desc: "Expressing quantities as percentages, reverse percentages, percentage change." },
      { id: "n4", code: "N4", strand: "Number & Algebra", title: "Rate and Speed", desc: "Average rate, speed, constant speed, unit conversions, and related problems." },
      { id: "n5", code: "N5", strand: "Number & Algebra", title: "Algebraic Expressions and Formulae", desc: "Using letters to represent numbers, algebraic notation, expansion, factorisation, and simplification." },
      { id: "n6", code: "N6", strand: "Number & Algebra", title: "Functions and Graphs", desc: "Cartesian coordinates, linear functions y = ax + b, and gradients." },
      { id: "n7", code: "N7", strand: "Number & Algebra", title: "Equations and Inequalities", desc: "Solving linear equations in one variable, simple fractional equations, and formulating equations." },
      { id: "g1", code: "G1", strand: "Geometry & Measurement", title: "Angles, Triangles and Polygons", desc: "Angle types, parallel lines, properties of triangles, quadrilaterals, and regular polygons." },
      { id: "g5a", code: "G5", strand: "Geometry & Measurement", title: "Mensuration", desc: "Area of parallelogram and trapezium, perimeter and area of composite figures, volume of prism and cylinder." },
      { id: "s1a", code: "S1", strand: "Statistics & Probability", title: "Data Handling and Analysis", desc: "Collecting and classifying data; interpreting tables, bar graphs, pictograms, line graphs, and pie charts." },
    ],
    "E Math": [],
    "A Math": [],
  },
  sec2: {
    only: [
      { id: "n2b", code: "N2", strand: "Number & Algebra", title: "Ratio and Proportion", desc: "Map scales (distance and area), direct and inverse proportion." },
      { id: "n5b", code: "N5", strand: "Number & Algebra", title: "Algebraic Expressions and Formulae", desc: "Expansion of products, changing subject of formula, algebraic identities, factorisation of quadratics, algebraic fractions." },
      { id: "n6b", code: "N6", strand: "Number & Algebra", title: "Functions and Graphs", desc: "Quadratic functions y = ax² + bx + c, maximum/minimum points, symmetry." },
      { id: "n7b", code: "N7", strand: "Number & Algebra", title: "Equations and Inequalities", desc: "Linear inequalities, simultaneous linear equations (substitution, elimination, graphical), quadratic equations by factorisation." },
      { id: "g2a", code: "G2", strand: "Geometry & Measurement", title: "Congruence and Similarity", desc: "Congruent and similar figures, properties of similar triangles, enlargement and reduction." },
      { id: "g4a", code: "G4", strand: "Geometry & Measurement", title: "Pythagoras' Theorem and Trigonometry", desc: "Pythagoras' theorem, trigonometric ratios (sin, cos, tan) for right-angled triangles." },
      { id: "g5b", code: "G5", strand: "Geometry & Measurement", title: "Mensuration", desc: "Volume and surface area of pyramid, cone and sphere." },
      { id: "s1b", code: "S1", strand: "Statistics & Probability", title: "Data Handling and Analysis", desc: "Dot diagrams, histograms, stem-and-leaf diagrams; mean, mode and median; grouped data." },
      { id: "s2a", code: "S2", strand: "Statistics & Probability", title: "Probability", desc: "Probability as a measure of chance, probability of single events, listing outcomes." },
    ],
    "E Math": [],
    "A Math": [],
  },
  sec34: {
    only: [],
    "E Math": [
      { id: "n1c", code: "N1", strand: "Number & Algebra", title: "Numbers and their Operations", desc: "Standard form (A × 10ⁿ), positive/negative/fractional indices, laws of indices." },
      { id: "n6c", code: "N6", strand: "Number & Algebra", title: "Functions and Graphs", desc: "Sketching quadratic functions, power functions y = axⁿ, exponential functions y = kaˣ, gradient of a curve." },
      { id: "n7c", code: "N7", strand: "Number & Algebra", title: "Equations and Inequalities", desc: "Solving quadratic equations (formula, completing the square, graphical), fractional equations, linear inequalities." },
      { id: "n8", code: "N8", strand: "Number & Algebra", title: "Set Language and Notation", desc: "Set notation, union, intersection, complement, Venn diagrams." },
      { id: "n9", code: "N9", strand: "Number & Algebra", title: "Matrices", desc: "Matrix representation, addition, subtraction, scalar multiplication, matrix multiplication." },
      { id: "g2b", code: "G2", strand: "Geometry & Measurement", title: "Congruence and Similarity", desc: "Scale drawings, perpendicular bisectors, angle bisectors, congruent/similar triangles, ratio of areas and volumes." },
      { id: "g3", code: "G3", strand: "Geometry & Measurement", title: "Properties of Circles", desc: "Symmetry properties of circles, angle properties — angle at centre, angles in same segment, tangent-radius." },
      { id: "g4b", code: "G4", strand: "Geometry & Measurement", title: "Pythagoras' Theorem and Trigonometry", desc: "Sine and cosine for obtuse angles, area formula ½ab sin C, sine rule, cosine rule, 2D and 3D problems." },
      { id: "g5c", code: "G5", strand: "Geometry & Measurement", title: "Mensuration", desc: "Arc length, sector area, area of segment, radian measure, conversion between radians and degrees." },
      { id: "g6", code: "G6", strand: "Geometry & Measurement", title: "Coordinate Geometry", desc: "Gradient, length of line segment, equation of straight line y = mx + c, geometric problems using coordinates." },
      { id: "g7", code: "G7", strand: "Geometry & Measurement", title: "Vectors in Two Dimensions", desc: "Vector notation, directed line segments, position vectors, magnitude, sum and difference of vectors." },
      { id: "s1c", code: "S1", strand: "Statistics & Probability", title: "Data Handling and Analysis", desc: "Quartiles, percentiles, interquartile range, standard deviation, cumulative frequency diagrams, box-and-whisker plots." },
      { id: "s2b", code: "S2", strand: "Statistics & Probability", title: "Probability", desc: "Combined events, possibility diagrams, tree diagrams, addition and multiplication of probabilities." },
    ],
    "A Math": [
      { id: "a1", code: "A1", strand: "Algebra", title: "Quadratic Functions", desc: "Completing the square, maximum/minimum, conditions for always positive/negative, quadratic models." },
      { id: "a2", code: "A2", strand: "Algebra", title: "Equations and Inequalities", desc: "Discriminant conditions, simultaneous equations by substitution, quadratic inequalities on number line." },
      { id: "a3", code: "A3", strand: "Algebra", title: "Surds", desc: "Four operations on surds, rationalising the denominator, solving equations involving surds." },
      { id: "a4", code: "A4", strand: "Algebra", title: "Polynomials and Partial Fractions", desc: "Polynomial division, remainder and factor theorems, cubic equations, partial fractions." },
      { id: "a5", code: "A5", strand: "Algebra", title: "Binomial Expansions", desc: "Binomial theorem for positive integer n, binomial notation, general term." },
      { id: "a6", code: "A6", strand: "Algebra", title: "Exponential and Logarithmic Functions", desc: "Graphs of aˣ, eˣ, logₐx, ln x; laws of logarithms; change of base; exponential/log equations and models." },
      { id: "ag1", code: "G1", strand: "Geometry & Trigonometry", title: "Trigonometric Functions, Identities and Equations", desc: "Six trig functions, amplitude, period, graphs of sin/cos/tan, compound angle formulae, double angle, R-formula, identities, equations." },
      { id: "ag2", code: "G2", strand: "Geometry & Trigonometry", title: "Coordinate Geometry", desc: "Parallel and perpendicular lines, midpoint, area of rectilinear figure, circles, linearisation of non-linear data." },
      { id: "ag3", code: "G3", strand: "Geometry & Trigonometry", title: "Proofs in Plane Geometry", desc: "Parallel lines, perpendicular bisectors, congruent/similar triangles, midpoint theorem, tangent-chord theorem." },
      { id: "ac1", code: "C1", strand: "Calculus", title: "Differentiation and Integration", desc: "Derivatives, chain/product/quotient rules, stationary points, integration, definite integrals, area under curve, kinematics." },
    ],
  },
};

export const LEVEL_LABELS: Record<Level, string> = {
  sec1: "Secondary 1",
  sec2: "Secondary 2",
  sec34: "Secondary 3 – 4",
};

export const STRANDS = {
  "E Math": ["Number & Algebra", "Geometry & Measurement", "Statistics & Probability"],
  "A Math": ["Algebra", "Geometry & Trigonometry", "Calculus"],
};
