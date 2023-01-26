// const BookCopyModel = require("./models/bookCopyModel")
const BookDetailsModel = require("./models/bookDetailsModel.js")
// const LoanModel = require("./models/loanModel")
// const UserModel = require("./models/userModel")
// const dbClose = require("./config/db")

// Delete the existing entries in our database. 
await BookDetailsModel.deleteMany() 
console.log("Deleted all book details in the Wormreads database")

// await UserModel.deleteMany()
// console.log("Deleted all user details in the Wormreads database")

const bookDetails = [
  { title: "Alice's Adventures in Wonderland", 
    author: "Lewis Carroll",
    genre: "Adventure",
    description: "When Alice falls down a rabbit hole, nothing could prepare her for the adventure that awaits her on the other side. One minute she's too big, the next she's too small, and she has no idea where she is or how she can get home. On her journey, Alice is greeted by a constant stream of unlikely characters and situations: racing in a circle with a group of displaced animals, a conversation with a caterpillar, and of course, the famous tea party with the Mad Hatter and March Hare."
  },
  { title: "Pride and Prejudice", 
    author: "Jane Austen",
    genre: "Romance",
    description: "Pride and Prejudice is the story of Elizabeth Bennet and her four sisters who are all unmarried. When the wealthy young gentleman, Charles Bingley, rents the nearby manor of Netherfield Park the opportunity to find a husband presents itself. While attending a ball the Bennets meet Mr. Bingley and his friend Mr. Darcy for the first time. Mr. Bingley and Jane, Elizabeth's older sister, form a quick friendship, while Mr. Darcy shows little interest in Elizabeth by refusing to dance with her. However in subsequent weeks Mr. Darcy finds himself increasingly attracted to Elizabeth and as the novel progresses the reader is made to ask will a romance between Mr. Darcy and Elizabeth come to be. Discover for yourself in this classic 19th century love story."
  },
  { title: "Frankenstein", 
    author: "Mary Shelley ",
    genre: "Horror",
    description: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking. I am already far north of London, and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is for ever visible, its broad disk just skirting the horizon and diffusing a perpetual splendour."
  },
  { title: "The Count of Monte Cristo", 
    author: "Alexandre Dumas ",
    genre: "Historical Fiction",
    description: "On the 24th of February, 1815, the look-out at Notre-Dame de la Garde signalled the three-master, the Pharaon from Smyrna, Trieste, and Naples. As usual, a pilot put off immediately, and rounding the Château. If, got on board the vessel between Cape Morgiou and Rion island. Immediately, and according to custom, the ramparts of Fort Saint-Jean were covered with spectators; it is always an event at Marseilles for a ship to come into port, especially when this ship, like the Pharaon, has been built, rigged, and laden at the old Phocee docks, and belongs to an owner of the city."
  },
  { title: "David Copperfield", 
    author: "Charles Dickens",
    genre: "Historical Fiction",
    description: "I do not find it easy to get sufficiently far away from this Book, in the first sensations of having finished it, to refer to it with the composure which this formal heading would seem to require. My interest in it, is so recent and strong; and my mind is so divided between pleasure and regret—pleasure in the achievement of a long design, regret in the separation from many companions—that I am in danger of wearying the reader whom I love, with personal confidences, and private emotions. "
  },
  { title: "Moby-Dick", 
    author: "Herman Melville ",
    genre: "Adventure",
    description: "It will be seen that this mere painstaking burrower and grub-worm of a poor devil of a Sub-Sub appears to have gone through the long Vaticans and street-stalls of the earth, picking up whatever random allusions to whales he could anyways find in any book whatsoever, sacred or profane. Therefore you must not, in every case at least, take the higgledy-piggledy whale statements, however authentic, in these extracts, for veritable gospel cetology. Far from it. As touching the ancient authors generally, as well as the poets here appearing, these extracts are solely valuable or entertaining, as affording a glancing bird/'s eye view of what has been promiscuously said, thought, fancied, and sung of Leviathan, by many nations and generations, including our own. "
  },
  { title: "Les Misérables", 
    author: "Victor Hugo",
    genre: "Adventure",
    description: "So long as there shall exist, by virtue of law and custom, decrees of damnation pronounced by society, artificially creating hells amid the civilization of earth, and adding the element of human fate to divine destiny; so long as the three great problems of the century--the degradation of man through pauperism, the corruption of woman through hunger, the crippling of children through lack of light--are unsolved."
  },
  { title: "Dracula", 
    author: "Bram Stoker",
    genre: "Horror",
    description: "3 May. Bistritz.—Left Munich at 8:35 P. M., on 1st May, arriving at Vienna early next morning; should have arrived at 6:46, but train was an hour late. Buda-Pesth seems a wonderful place, from the glimpse which I got of it from the train and the little I could walk through the streets. I feared to go very far from the station, as we had arrived late and would start as near the correct time as possible. The impression I had was that we were leaving the West and entering the East; the most western of splendid bridges over the Danube, which is here of noble width and depth, took us among the traditions of Turkish rule."
  },
  { title: "Mrs Dalloway", 
    author: "Virginia Woolf",
    genre: "Fiction",
    description: "Mrs. Dalloway said she would buy the flowers herself. For Lucy had her work cut out for her. The doors would be taken off their hinges; Rumpelmayer's men were coming. And then, thought Clarissa Dalloway, what a morning—fresh as if issued to children on a beach. What a lark! What a plunge! For so it had always seemed to her, when, with a little squeak of the hinges, which she could hear now, she had burst open the French windows and plunged at Bourton into the open air."
  },
  { title: "The Sun Also Rises", 
    author: "Ernest Hemingway",
    genre: "Adventure",
    description: "Robert Cohn was once middleweight boxing champion of Princeton. Do not think that I am very much impressed by that as a boxing title, but it meant a lot to Cohn. He cared nothing for boxing, in fact he disliked it, but he learned it painfully and thoroughly to counteract the feeling of inferiority and shyness he had felt on being treated as a Jew at Princeton. There was a certain inner comfort in knowing he could knock down anybody who was snooty to him, although, being very shy and a thoroughly nice boy, he never fought except in the gym. He was Spider Kelly's star pupil. Spider Kelly taught all his young gentlemen to box like featherweights, no matter whether they weighed one hundred and five or two hundred and five pounds. But it seemed to fit Cohn. He was really very fast. He was so good that Spider promptly overmatched him and got his nose permanently flattened. This increased Cohn's distaste for boxing, but it gave him a certain satisfaction of some strange sort, and it certainly improved his nose. In his last year at Princeton he read too much and took to wearing spectacles. I never met any one of his class who remembered him. They did not even remember that he was middleweight boxing champion."
  } 
]

// await bookDetailsModel.insertMany(bookDetails)
// console.log("Inserted seed data for book details.")
// dbClose() // Closes the MongoDB connection







