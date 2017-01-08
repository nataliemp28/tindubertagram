const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const db = require('../config/db');

mongoose.connect(db.uri);

User.collection.drop();
Post.collection.drop();

User.create([{
  email: 'oli@test.com',
  firstName: 'Oli',
  lastName: 'Moore',
  bio: 'Travel loving coding genius',
  image: 'oli.jpg',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'thea@test.com',
  firstName: 'Thea',
  lastName: 'Carter',
  bio: 'Travel loving actress',
  image: 'thea.jpg',
  password: 'password',
  passwordConfirmation: 'password'
},{
  email: 'nat@test.com',
  firstName: 'Nat',
  lastName: 'Pateman',
  bio: 'Travel loving Kiwi',
  image: 'nat.jpg',
  password: 'password',
  passwordConfirmation: 'password'
}], (err, users) => {

  if(err) return console.log(err);

  Post.create([{
    title: 'Santorini Holiday',
    image: 'Horse-Contrast.jpg',
    bodyText: `<h1>Horsing Around - I can do that</h1>
<p>Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.</p>

<h1>Economy</h1>
<p>Santorini's primary industry is tourism. The two main sources of wealth in Santorini are agriculture and tourism. In recent years, Santorini has been voted one of the world's most beautiful islands (2015 Travelers” Choice Awards Reader's Choice Awards, amongst others).
Santorini remains the home of a small, but flourishing wine industry, based on the indigenous Assyrtiko grape variety. White varieties also include Athiri and Aidani, whereas red varieties include mavrotragano and mandilaria.</p>`,
    user: users[0],
    latlng: {
      lat: 50,
      lng: 0
    },
    comments: null,
    likes: null
  },
  {
    title: 'India',
    image: 'Indian_Man_in-_Window.jpg',
    bodyText: `<h1>Indian trekking</h1>
<p>India is a vast South Asian country with diverse terrain – from Himalayan peaks to Indian Ocean coastline – and history reaching back 5 millennia. In the north, Mughal Empire landmarks include Delhi’s Red Fort complex and massive Jama Masjid mosque, plus Agra’s iconic Taj Mahal mausoleum. Pilgrims bathe in the Ganges in Varanasi, and Rishikesh is a yoga centre and base for Himalayan trekking.</p>

<h1>Coastline</h1>
<p>India's coastline measures 7,517 kilometres (4,700 mi) in length; of this distance, 5,423 kilometres (3,400 mi) belong to peninsular India and 2,094 kilometres (1,300 mi) to the Andaman, Nicobar, and Lakshadweep island chains.[130] According to the Indian naval hydrographic charts, the mainland coastline consists of the following: 43% sandy beaches; 11% rocky shores, including cliffs; and 46% mudflats or marshy shores.</p>`,
    user: users[0],
    latlng: {
      lat: 50,
      lng: 0
    },
    comments: null,
    likes: null
  },
  {
    title: 'French Vineyard Tour',
    image: 'bordeaux.jpeg',
    bodyText: `<h1>Bordeaux</h1>
<p>Bordeaux, hub of the famed wine-growing region, is a port city on the Garonne River in southwestern France. It’s known for its Gothic Cathédrale Saint-André, 18th- to 19th-century mansions and notable art museums such as the Musée des Beaux-Arts de Bordeaux. Public gardens line the curving river quays. The grand Place de la Bourse, centered on the Three Graces fountain, overlooks the Miroir d’Eau reflecting pool.</p>

<h1>Burgundy</h1>
<p>Burgundy is a historical region in east-central France. It's famous for its Burgundy wines as well as Pinot Noirs and Chardonnays, Chablis and Beaujolais. The area is crisscrossed by a network of canals and studded with grand châteaux, some now luxury hotels. The capital, Dijon, of mustard fame, is home to the imposing Palace of the Dukes, where the distinguished Musée des Beaux-Arts was established in 1787.</p>`,
    user: users[2],
    latlng: {
      lat: 47.0525,
      lng: 4.3837
    },
    comments: null,
    likes: null
  },

  {
    title: 'A Jolly to Iceland',
    image: 'iceland.jpeg',
    bodyText: `<h1>Crazy crazy cold!</h1>
  <p>Iceland, a Nordic island nation, is defined by its dramatic landscape with volcanoes, geysers, hot springs and lava fields. Massive glaciers are protected in Vatnajökull and Snæfellsjökull national parks. Most of the population lives in the capital, Reykjavik, which runs on geothermal power and is home to the National and Saga museums, tracing Iceland’s Viking history.</p>`,
    user: users[2],
    latlng: {
      lat: 64.9631,
      lng: 19.0208
    },
    comments: null,
    likes: null
  },

  {
    title: 'Romantic Turkish Getaway',
    image: 'turkey.jpeg',
    bodyText: `<h1>Hot sunny Antalya</h1>
  <p>Antalya is a Turkish resort city with a yacht-filled Old Harbor and beaches flanked by large hotels. It's a gateway to Turkey's southern Mediterranean region, known as the Turquoise Coast for its blue waters. Remnants remain from Antalya's time as a major Roman port. These include Hadrian’s Gate, built to honor the Roman emperor’s visit in 130 A.D and 2nd-century Hidirlik Tower, with harbor views.</p>`,
    user: users[2],
    latlng: {
      lat: 36.8969,
      lng: 30.7133
    },
    comments: null,
    likes: null
  },

  {
    title: 'Sardinian Seaside',
    image: 'sardinia.jpeg',
    bodyText: `<h1>Sardinian Horse Trekking</h1>
  <p>Sardinia is a large Italian island in the Mediterranean Sea. It has nearly 2,000km of coastline, sandy beaches and a mountainous interior crossed with hiking trails. Its rugged landscape is dotted with thousands of nuraghi – mysterious Bronze Age stone ruins shaped like beehives. One of the largest and oldest nuraghi is Su Nuraxi in Barumini, dating to 1500 B.C..</p>`,
    user: users[2],
    latlng: {
      lat: 40.1209,
      lng: 9.0129
    },
    comments: null,
    likes: null
  },




  {
    title: 'Hiriketiya Beach, Sri Lanka',
    image: 'sri.jpg',
    bodyText: `<h1>3 days in paradise...</h1>
<p>Hiriketiya Bay is the hidden gem of Sri Lanka's south coast. A little horseshoe bay with good surf year round for all levels in the perfect paradise...</p>`,
    user: users[1],
    latlng: {
      lat: 5.963430,
      lng: 80.703120
    },
    comments: null,
    likes: null
  },{
    title: 'Nine Arch Bridge',
    image: 'ninearch.jpg',
    bodyText: `<h1>Day One</h1>
<p>This viaduct was built at Gotuwala between the two railway stations – Ella and Demodara during the British Colonial period is the largest in Sri Lanka. Located almost 3100 feet above the sea level, this 99.6ft high bridge is called “Ahas namaye palama” (Nine skies bridge) in Sinhala. When one stands underneath it and looks up there is a beautiful sight of ‘nine skies’ through the nine arches, hence the Sinhala name. This bridge is also called ‘The Bridge in the sky’ due to the sheer height. This massive bridge is built entirely of solid rocks, bricks and cement without using a single piece of steel. The bridge was finally commissioned in 1921. There is a popular story to say that when construction work was commenced on the bridge, the World War 1 broke-out and the steel consignment assigned for this site was seized and was used for war related projects. When the work came to a standstill the locals came forward and build the bridge with solid stone bricks and cement without steel. This viaduct was built at Gotuwala between the two railway stations – Ella and Demodara during the British Colonial period is the largest in Sri Lanka. Located almost 3100 feet above the sea level, this 99.6ft high bridge is called “Ahas namaye palama” (Nine skies bridge) in Sinhala. When one stands underneath it and looks up there is a beautiful sight of ‘nine skies’ through the nine arches, hence the Sinhala name. This bridge is also called ‘The Bridge in the sky’ due to the sheer height. This massive bridge is built entirely of solid rocks, bricks and cement without using a single piece of steel. The bridge was finally commissioned in 1921. There is a popular story to say that when construction work was commenced on the bridge, the World War 1 broke-out and the steel consignment assigned for this site was seized and was used for war related projects. When the work came to a standstill the locals came forward and build the bridge with solid stone bricks and cement without steel.</p>

<h1>Day Two- Tea Plantations</h1>
<p>Another district in the Central Province is Nuwara Eliya, best known for its tea. Due to its geo climatic attributes, Nuwara Eliya is known to produce tea of particularly fine quality. With the highest altitudes at over 6,000 ft, cool climes, and moderate rainfall the region possesses a highly conducive environment for tea cultivation. There are two seasons that arrive here namely the eastern and the western, and the climatic conditions vary from one estate to another although located short drives apart. The liqueur produced from unusually small leaves characteristic of the region, is the lightest among the regionals varieties. Among the several grades produced from Nuwara Eliya the most popular is the whole-leaf orange pekoe (OP).
</p>`,
    user: users[1],
    latlng: {
      lat: 6.876815,
      lng: 81.060847
    },
    comments: null,
    likes: null
  },{
    title: 'Adams Mini Peak',
    image: 'branch.jpg',
    bodyText: `<h1>A Longh Day Ahead...</h1>
<p> Our second hike in Ella was to Little Adam\`s Peak, which we did in between the two longer ones. We did this trip without a guide. It is a fairly easy hike and the path is market by signs so it\`s easy to find, and very popular among tourists! So expect to meet many other people from all over the world on this trip! On the two other more remote trips we did in Ella, we hardly met anybody, just some locals now and then. The Little Adam\'s Peak. it\`s named after it\`s big brother, the holy mountain Adam\`s Peak, because of the similar shape. Adam\`s Peak is further west in Sri Lanka, close to Nuwara Eliya, and is 2243 m high and a much more exhausting and more challenging climb! The mountain has however three names; Adam\`s Peak (this is where Adam first set foot on earth after being cast out of heaven), Sri Pada (Buddha\`s footprint left by the Buddha as he headed towards paradise) and Samanalakande (Butterfly mountain, where butterflies go to die). We had plans of climbing Big Adams Peak, but Espen hurt his knee so we settled for the “little brother” instead.</p>`,
    user: users[1],
    latlng: {
      lat: 6.811466,
      lng: 80.499388
    },
    comments: null,
    likes: null
  },{
    title: 'Hello Lombok...',
    image: 'sunsetsri.jpg',
    bodyText: `<h1>New horizons...</h1>
<p>Lombok is an island in West Nusa Tenggara province, Indonesia. It forms part of the chain of the Lesser Sunda Islands, with the Lombok Strait separating it from Bali to the west and the Alas Strait between it and Sumbawa to the east. It is roughly circular, with a "tail" (Sekotong Peninsula) to the southwest, about 70 kilometres (43 miles) across and a total area of about 4,514 square kilometres (1,743 square miles). The provincial capital and largest city on the island is Mataram. It is somewhat similar in size and density with neighboring Bali and shares some cultural heritage, but is administratively part of Nusa Tenggara Barat along with sparsely populated Sumbawa. It is surrounded by a number of smaller islands locally called Gili.</p>`,
    user: users[1],
    latlng: {
      lat: -8.650979,
      lng: 116.324944
    },
    comments: null,
    likes: null
  },{
    title: 'Ethiopia',
    image: 'Ethiopia_Storm.jpg',
    bodyText: `<h1>Horn of Africa</h1>
<p>Ethiopia, in the Horn of Africa, is a rugged, landlocked country split by the Great Rift Valley. With archaeological finds dating back more than 3 million years, it’s a place of ancient culture. Among its important sites are Lalibela with its rock-cut Christian churches from the 12th–13th centuries. Aksum is the ruins of an ancient city with obelisks, tombs, castles and Our Lady Mary of Zion church.</p>

<h1>Coffee</h1>
<p>Ethiopia is the place of origin for the coffee bean which originated from the place called Kefa (which was one of the 14 provinces in the old Ethiopian administration). It is a land of natural contrasts, with its vast fertile West, jungles, and numerous rivers, and the world's hottest settlement of Dallol in its north. The Ethiopian Highlands are Africa's largest continuous mountain ranges, and Sof Omar Caves contain Africa's largest cave. Ethiopia has the most UNESCO World Heritage Sites in Africa</p>`,
    user: users[0],
    latlng: {
      lat: 51.51,
      lng: -0.08
    },
    comments: [{
      userId: users[0]._id,
      bodyText: 'Example comment'
    }],
    likes: [{
      userId: users[0]._id
    }]
  }], () => {

    users[0].following = [users[1], users[2]];
    users[0].save(() => {
      console.log('User 1 saved!');
    });

    users[1].following = [users[0], users[2]];
    users[1].save(() => {
      console.log('User 2 saved!');
    });

    users[2].following = [users[1], users[0]];
    users[2].save(() => {
      console.log('User 3 saved!');
    });
  });

});
