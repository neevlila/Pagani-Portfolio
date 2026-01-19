export interface Car {
    id: string
    slug: string
    name: string
    year: number
    production: string
    category: string
    tagline: string
    description: string
    engine: string
    horsepower: string
    topSpeed: string
    transmission: string
    drivetrain: string
    weight: string
    acceleration: string
    sketchfabUrl: string
    image?: string
    imageFit?: "cover" | "contain" | "fill"
    imagePosition?: string
}

export const cars: Car[] = [
    // Track-Only
    {
        id: "zonda-r",
        slug: "zonda-r",
        name: "Pagani Zonda R",
        year: 2009,
        production: "15 units",
        category: "Track Weapon",
        tagline: "The Unrestrained Beast",
        description: "The Pagani Zonda R is a track-only hypercar developed without racing regulations, allowing absolute freedom in design and engineering. Built as a technological laboratory for Pagani Automobili, it features a carbon-titanium monocoque and a naturally aspirated AMG V12. The Zonda R represents the purest expression of performance ever created by the brand.",
        engine: "6.0L AMG V12",
        horsepower: "750 HP",
        topSpeed: "350+ km/h",
        transmission: "6-Speed Sequential",
        drivetrain: "RWD",
        weight: "1,070 kg",
        acceleration: "0-100 km/h in 2.7s",
        sketchfabUrl: "https://sketchfab.com/models/6cf8c75a54794fdf895c2d005cbde426/embed?autospin=1&autostart=1&preload=1&dnt=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani Zonda R.png"
    },
    {
        id: "huayra-r",
        slug: "huayra-r",
        name: "Pagani Huayra R",
        year: 2021,
        production: "30 units",
        category: "Track-Only Hypercar",
        tagline: "Pure Mechanical Fury",
        description: "The Pagani Huayra R is a track-only hypercar developed without road regulations, allowing Pagani complete engineering freedom. It features the bespoke Pagani V12-R engine, a lightweight Carbo-Titanium HP62 monocoque, and extreme aerodynamics inspired by Le Mans prototypes. The Huayra R represents the ultimate expression of Pagani performance.",
        engine: "6.0L Naturally Aspirated Pagani V12-R",
        horsepower: "850 HP",
        topSpeed: "≈ 350 km/h",
        transmission: "6-Speed Sequential",
        drivetrain: "RWD",
        weight: "≈ 1,050 kg",
        acceleration: "0–100 km/h ≈ 3.0s",
        sketchfabUrl: "https://sketchfab.com/models/ee59b888788e4d768dfeda86998be1a0/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani Huayra R.jpeg"
    },

    // Road-Legal (Modern)
    {
        id: "huayra",
        slug: "huayra",
        name: "Pagani Huayra",
        year: 2011,
        production: "≈100 units",
        category: "Road-Legal Hypercar",
        tagline: "Art Shaped by the Wind",
        description: "A handcrafted hypercar featuring active aerodynamics, carbon-titanium monocoque, and a balance of art and engineering. Named after Huayra-tata, the Quechua wind god, the Huayra utilizes four active flaps to manage drag and downforce independently.",
        engine: "6.0L Twin-Turbo AMG V12",
        horsepower: "730 HP",
        topSpeed: "383 km/h",
        transmission: "7-Speed Automated Manual",
        drivetrain: "RWD",
        weight: "1,350 kg",
        acceleration: "0-100 km/h in 3.2s",
        sketchfabUrl: "https://sketchfab.com/models/c2d61a9f53a54a229547bb76e4b71e25/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani Huayra.jpg"
    },
    {
        id: "utopia",
        slug: "utopia",
        name: "Pagani Utopia",
        year: 2023,
        production: "99 Coupés + 130 Roadsters",
        category: "Road-Legal Hypercar",
        tagline: "The Return to Pure Driving",
        description: "The Pagani Utopia represents a return to mechanical purity in an era dominated by digital systems. Featuring a twin-turbo AMG V12, a lightweight Carbo-Titanium monocoque, and an available manual transmission, the Utopia is a celebration of driver engagement, craftsmanship, and timeless engineering.",
        engine: "6.0L Twin-Turbo AMG V12",
        horsepower: "864 HP",
        topSpeed: "≈350 km/h",
        transmission: "7-Speed Manual or Automated Manual",
        drivetrain: "RWD",
        weight: "≈1,280 kg",
        acceleration: "0–100 km/h ≈ 2.8s",
        sketchfabUrl: "https://sketchfab.com/models/4787fa901db1454bb971ba83739d1de6/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani-Utopia.jpg"
    },

    // Legacy Road Cars
    {
        id: "zonda-s-7-3",
        slug: "zonda-s-7-3",
        name: "Pagani Zonda S 7.3",
        year: 2002,
        production: "≈140 units (Zonda S range)",
        category: "Road-Legal Hypercar",
        tagline: "The Evolution of a Legend",
        description: "The Pagani Zonda S 7.3 marked a major evolution of the original Zonda, introducing a larger AMG V12 and refined aerodynamics. It solidified Pagani’s reputation for combining extreme performance with bespoke craftsmanship, setting the foundation for all future Zonda variants.",
        engine: "7.3L Naturally Aspirated AMG V12",
        horsepower: "555 HP",
        topSpeed: "≈355 km/h",
        transmission: "6-Speed Manual",
        drivetrain: "RWD",
        weight: "≈1,250 kg",
        acceleration: "0–100 km/h ≈ 3.7s",
        sketchfabUrl: "https://sketchfab.com/models/a712dc2575684822900515bcca72dd50/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani Zonda S 7.3.jpg"
    },
    {
        id: "zonda-f",
        slug: "zonda-f",
        name: "Pagani Zonda F",
        year: 2005,
        production: "≈25 units",
        category: "Road-Legal Hypercar",
        tagline: "Tribute to a Master",
        description: "The Pagani Zonda F was created in honor of Fangio, combining lightweight construction, refined aerodynamics, and a more powerful AMG V12. Widely considered one of the finest Zondas ever built, it represents the perfect balance between road usability and extreme performance.",
        engine: "7.3L Naturally Aspirated AMG V12",
        horsepower: "602 HP",
        topSpeed: "≈345 km/h",
        transmission: "6-Speed Manual",
        drivetrain: "RWD",
        weight: "≈1,230 kg",
        acceleration: "0–100 km/h ≈ 3.6s",
        sketchfabUrl: "https://sketchfab.com/models/8f0a79fc092c44abb199221a2abed0ca/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark=0",
        image: "/Pagani Zonda F.jpg",
        imageFit: "cover",
        imagePosition: "center"
    }
]
