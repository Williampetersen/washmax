import { englishPage, HOURS_EN, type ContentPage } from "./types";

// English pages for expats, visitors and international companies in Copenhagen.
export const english: ContentPage[] = [
  englishPage({
    slug: "mobile-car-wash-copenhagen",
    title: "Mobile Car Wash Copenhagen – We Come to You",
    description:
      "Mobile car wash in Copenhagen and Zealand. We come to your address with our own water and power. Exterior wash from 450 DKK. Book online in English.",
    h1: "Mobile car wash in Copenhagen",
    eyebrow: "Car wash at your address",
    intro:
      "No queue, no drive, no hose. CleanWash is a mobile car wash that comes to your home or office in Copenhagen and washes your car by hand where it is parked.",
    answer:
      "CleanWash is a mobile car wash serving Copenhagen and most of Zealand. We come to your address with our own water, power and equipment and wash the car by hand. An exterior wash costs from 450 DKK, a full inside-and-outside clean from 799 DKK. You pay when the car is finished.",
    sections: [
      {
        h: "How a mobile car wash works",
        p: [
          "You book online. Enter the car's Danish licence plate and the system finds its size and shows the price straight away. Pick a package, any extras and a time that suits you. A confirmation arrives by email.",
          "On the day we arrive with everything we need. The car is washed where it stands: in your driveway, on the street outside your flat, in a courtyard or in your office car park. When we are done, we let you know and you pay – most customers use MobilePay.",
        ],
      },
      {
        h: "You do not need to provide anything",
        p: [
          "We carry our own water and electricity. That means we can wash cars at apartment buildings and other places with no outdoor tap or socket. All we need is access to the car. It must be legally parked, and we need room to walk around it.",
          "For an exterior wash you do not have to be home. For interior cleaning we need the car unlocked, so we agree on how to hand over the key.",
        ],
        list: [
          "No hose, no extension cord",
          "No need to move the car",
          `Open seven days a week, ${HOURS_EN}`,
          "Free cancellation up to 24 hours before",
        ],
      },
      {
        h: "Living in a flat in Copenhagen?",
        p: [
          "Most people in the city park on the street or in a shared courtyard. Washing a car yourself is not really an option, and automatic car washes use rotating brushes that can leave fine scratches in the paint.",
          "A hand wash at your address solves both problems. If you park in a courtyard or basement garage, check that your housing association allows car washing there, and mention it when you book.",
        ],
      },
      {
        h: "Where we operate",
        p: [
          "We cover the City of Copenhagen, Frederiksberg, Greater Copenhagen and large parts of Zealand – including Hellerup, Gentofte, Lyngby, Amager, Ørestad, Nordhavn, Roskilde, Køge, Hillerød and Helsingør. The booking calendar shows the times available at your address.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to provide water or electricity?",
        a: "No. We bring both.",
      },
      {
        q: "How much does a mobile car wash cost in Copenhagen?",
        a: "Exterior wash 450–899 DKK, interior cleaning 600–899 DKK and the full car 799–1,500 DKK, depending on the size of the car. All prices include 25% VAT.",
      },
      {
        q: "Can I book and communicate in English?",
        a: "Yes. The booking form is simple to follow, and you are welcome to email us in English.",
      },
      {
        q: "How do I pay?",
        a: "After the wash – by MobilePay, bank transfer or cash by agreement. Companies can be invoiced.",
      },
      {
        q: "My car has foreign plates. Can I still book?",
        a: "Yes. If the plate is not found, choose the car size manually in the booking or contact us.",
      },
    ],
    keywords: ["mobile car wash Copenhagen", "car wash at home Copenhagen", "car wash Copenhagen", "mobile car cleaning Copenhagen", "car wash Denmark"],
    image: { src: "/service/udenfor.jpg", alt: "Mobile car wash at a customer's address in Copenhagen" },
    related: [
      "/car-wash-copenhagen",
      "/car-wash-prices-copenhagen",
      "/interior-car-cleaning-copenhagen",
      "/hand-car-wash-copenhagen",
      "/booking",
      "/kontakt",
    ],
    pkg: "outside",
  }),

  englishPage({
    slug: "interior-car-cleaning-copenhagen",
    title: "Interior Car Cleaning Copenhagen – from 600 DKK",
    description:
      "Professional interior car cleaning at your address in Copenhagen. Vacuuming, surfaces, windows, seat cleaning and odour removal. From 600 DKK.",
    h1: "Interior car cleaning in Copenhagen",
    eyebrow: "A clean cabin, at your door",
    intro:
      "The inside of the car is where you spend your time. We clean it properly – seats, carpets, dashboard, boot and windows – without you driving anywhere.",
    answer:
      "CleanWash offers interior car cleaning at your address in Copenhagen and Zealand. It costs from 600 DKK, takes about 75 minutes and includes vacuuming of seats, floor and boot, wiping of all surfaces and cleaning the windows from the inside. Seat cleaning, leather care and odour removal are optional extras.",
    sections: [
      {
        h: "What is included",
        p: [
          "An interior clean follows a fixed order so nothing is missed.",
        ],
        list: [
          "Floor mats removed and cleaned separately",
          "Seats, floor and boot vacuumed – including under and between the seats",
          "Dashboard, steering wheel, centre console and door panels wiped",
          "Glove box, cup holders and door pockets cleaned",
          "Windows cleaned on the inside",
        ],
      },
      {
        h: "Extras for cars that need more",
        p: [
          "Some cars need more than a vacuum and a cloth. You choose extras in the booking and only pay for what the car needs.",
        ],
        list: [
          "Seat shampoo, up to five seats: 300 DKK",
          "Stain removal from a seat: 250 DKK",
          "Leather cleaning and conditioning: 399 DKK",
          "Pet hair removal: 200 DKK",
          "Smoke odour removal: 300 DKK",
          "Air-conditioning cleaning: 300 DKK",
          "Child seat cleaning: 100 DKK",
        ],
      },
      {
        h: "Moving out, selling or returning a lease car?",
        p: [
          "If you are leaving Denmark, selling a car or handing back a leased or company car, the interior will be inspected closely. A professional clean before the handover reduces the risk of deductions and makes the car easier to sell.",
          "Book the full car package if the outside needs attention too. It includes an exterior hand wash and wax and costs from 799 DKK.",
        ],
      },
      {
        h: "How often?",
        p: [
          "Four to six times a year is right for most daily drivers. Every other month if you have children or a dog. Clean windows on the inside also make a real difference to visibility in low winter sun.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does interior car cleaning cost in Copenhagen?",
        a: "600 DKK for a small car, 700 DKK for a medium car, 799 DKK for a large car or SUV and 899 DKK for a van. Prices include VAT.",
      },
      {
        q: "How long does it take?",
        a: "About 75 minutes without extras.",
      },
      {
        q: "Do you shampoo the seats?",
        a: "Seats are vacuumed as standard. Wet seat cleaning is an extra at 300 DKK for up to five seats.",
      },
      {
        q: "Do I need to empty the car first?",
        a: "Please remove valuables and personal belongings. If you want us to clear out rubbish and loose items, add the emptying extra for 99 DKK.",
      },
      {
        q: "Can you remove smoke smell?",
        a: "Yes, in most cases. Heavy, long-term smoke odour can be greatly reduced but may need more than one treatment.",
      },
    ],
    keywords: ["interior car cleaning Copenhagen", "car interior cleaning Copenhagen", "car detailing Copenhagen", "car seat cleaning Copenhagen", "car valeting Copenhagen"],
    image: { src: "/service/inside.jpg", alt: "Professional interior car cleaning in Copenhagen" },
    related: [
      "/mobile-car-wash-copenhagen",
      "/car-wash-prices-copenhagen",
      "/hand-car-wash-copenhagen",
      "/car-wash-copenhagen",
      "/retur-leasebil",
      "/booking",
    ],
    pkg: "inside",
  }),

  englishPage({
    slug: "car-wash-prices-copenhagen",
    title: "Car Wash Prices Copenhagen – Full Price List",
    description:
      "Car wash prices in Copenhagen: exterior wash 450–899 DKK, interior cleaning 600–899 DKK, full car 799–1,500 DKK. Mobile service, VAT included.",
    h1: "Car wash prices in Copenhagen",
    eyebrow: "Clear prices, VAT included",
    intro:
      "Here is what a mobile car wash costs with CleanWash. The price depends on the package and the size of the car – nothing else.",
    answer:
      "With CleanWash an exterior hand wash costs 450–899 DKK, interior cleaning 600–899 DKK and the full car inside and outside 799–1,500 DKK, depending on vehicle size. Prices include 25% VAT, travel to your address and our own water and power. You pay after the wash.",
    sections: [
      {
        h: "How the price is calculated",
        p: [
          "There are three packages and four car sizes. The size is determined from the car's registered gross weight, which the booking system looks up from the licence plate. You see the exact price before you confirm.",
        ],
        list: [
          "Small car: gross weight up to 1,300 kg",
          "Medium car: over 1,300 kg",
          "Large car / SUV: over 2,000 kg",
          "Van: registered as a van, or over 2,500 kg",
        ],
      },
      {
        h: "What you get in each package",
        p: [
          "The exterior wash is a hand wash with pre-wash foam, wheels, wheel arches, windows and drying. It takes about 65 minutes. Interior cleaning covers vacuuming, surfaces and inside windows and takes about 75 minutes.",
          "The full car package combines both and finishes with a coat of wax on the paint. It takes about 110 minutes and is cheaper than buying the two separately.",
        ],
      },
      {
        h: "Good to know about heavy cars",
        p: [
          "Electric cars and plug-in hybrids are heavy because of the battery. Many of them fall into the large-car category, and the heaviest into the top category, even if they are not large to look at. The booking shows your category before you pay anything.",
        ],
      },
      {
        h: "Discounts and cancellation",
        p: [
          "Book two cars for the same visit and the second car gets 15% off its base price. You can cancel or move a booking free of charge up to 24 hours before the appointment.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the cheapest car wash you offer?",
        a: "An exterior hand wash of a small car at 450 DKK.",
      },
      {
        q: "Are prices including VAT?",
        a: "Yes. All listed prices include 25% Danish VAT.",
      },
      {
        q: "Is there a call-out fee?",
        a: "Travel is included in the package price. If a surcharge applies to an address far from our routes, it is shown in the price before you confirm.",
      },
      {
        q: "Why is my electric car priced as a large car?",
        a: "The category follows the car's gross weight. Batteries make electric cars heavier than comparable petrol cars.",
      },
      {
        q: "When do I pay?",
        a: "After the wash, by MobilePay, bank transfer or cash by agreement.",
      },
    ],
    keywords: ["car wash prices Copenhagen", "car wash cost Copenhagen", "how much is a car wash in Denmark", "car cleaning price Copenhagen", "mobile car wash price"],
    image: { src: "/service/helebil.jpg", alt: "Mobile car wash in Copenhagen – price list" },
    related: [
      "/mobile-car-wash-copenhagen",
      "/interior-car-cleaning-copenhagen",
      "/hand-car-wash-copenhagen",
      "/car-wash-copenhagen",
      "/bilvask-priser",
      "/booking",
    ],
    pkg: "whole",
  }),

  englishPage({
    slug: "hand-car-wash-copenhagen",
    title: "Hand Car Wash Copenhagen – No Brushes",
    description:
      "Gentle hand car wash at your address in Copenhagen. Pre-wash foam, clean wash mitts and hand drying – no brushes. From 450 DKK. Book online.",
    h1: "Hand car wash in Copenhagen",
    eyebrow: "Gentle on the paint",
    intro:
      "A hand wash is the gentlest way to clean a car. We do it at your address, so you get the result without spending your Saturday on it.",
    answer:
      "CleanWash offers a hand car wash at your address in Copenhagen and Zealand. The car is pre-washed with foam, washed by hand with clean mitts, and dried by hand. No rotating brushes are used. The exterior wash costs from 450 DKK and takes about 65 minutes.",
    sections: [
      {
        h: "Why hand wash instead of a tunnel wash?",
        p: [
          "Automatic car washes are quick and cheap. The trade-off is the brushes. They touch every car the same way and can drag grit across the paint, leaving fine circular scratches known as swirl marks. On dark cars they show up clearly in sunlight.",
          "In a hand wash the dirt is loosened first with foam and rinsed away. Only then does a wash mitt touch the paint. That is what keeps the finish free of new scratches.",
        ],
      },
      {
        h: "Step by step",
        p: [
          "Every exterior wash follows the same steps.",
        ],
        list: [
          "Rinse and pre-wash foam to loosen road film and grit",
          "Hand wash of the whole body with clean wash mitts",
          "Wheels, tyres and wheel arches cleaned",
          "Door jambs and edges wiped",
          "Rinse and hand drying to avoid water spots",
          "Windows and mirrors polished",
        ],
      },
      {
        h: "Made for cars people care about",
        p: [
          "Owners of new cars, leased cars, electric cars and dark-coloured cars often prefer a hand wash. Several manufacturers recommend avoiding brush washes in their owner's manuals. If your car has matte paint, a wrap or a ceramic coating, tell us in the booking so we can treat it correctly.",
        ],
      },
      {
        h: "Add wax for protection",
        p: [
          "Choose the full car package and the wash ends with a coat of wax. It adds gloss, makes water bead off and helps protect the paint against salt, sun and bird droppings. The package also includes interior cleaning and costs from 799 DKK.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a hand wash better than an automatic car wash?",
        a: "For the paint, yes. A correct hand wash with pre-wash and clean mitts minimises the risk of the fine scratches that brushes can cause.",
      },
      {
        q: "How much does a hand car wash cost in Copenhagen?",
        a: "From 450 DKK for a small car, 600 DKK for a medium car and 699 DKK for a large car or SUV.",
      },
      {
        q: "Do you use a pressure washer on the car?",
        a: "We rinse with care and never aim high pressure at sensitive parts such as charge ports, sensors or damaged paint.",
      },
      {
        q: "Can you wash a car with ceramic coating?",
        a: "Yes. Mention it when booking so we use suitable products and skip the wax.",
      },
      {
        q: "Where do you wash the car?",
        a: "Wherever it is legally parked and accessible – driveway, street, courtyard or office car park. We bring our own water and power.",
      },
    ],
    keywords: ["hand car wash Copenhagen", "hand wash car Copenhagen", "touchless car wash Copenhagen", "gentle car wash Copenhagen", "car wash no brushes"],
    image: { src: "/service/helebil.jpg", alt: "Hand car wash at a customer's address in Copenhagen" },
    related: [
      "/mobile-car-wash-copenhagen",
      "/car-wash-prices-copenhagen",
      "/interior-car-cleaning-copenhagen",
      "/car-wash-copenhagen",
      "/haandvask-bil-koebenhavn",
      "/booking",
    ],
    pkg: "outside",
  }),
];
