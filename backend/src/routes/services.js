const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Hardcoded seed data so pages work without DB seeding
const defaultServices = [
  {
    _id: '1', title: 'Pet Boarding', slug: 'pet-boarding', icon: '🏠',
    color: 'from-indigo-500 to-blue-500',
    description: 'Overnight care in a loving home environment',
    longDescription: 'Give your pet a home away from home. Our verified pet boarders provide overnight care in safe, comfortable environments. Your pet will receive personalized attention, regular meals, exercise, and lots of love while you are away.',
    pricing: { basePrice: 45, currency: 'USD', unit: 'night' },
    duration: 'Overnight / Multi-day',
    features: ['24/7 supervision', 'Home environment', 'Daily photo updates', 'Medication administration', 'Pick-up & drop-off available', 'Emergency vet access'],
    benefits: ['Peace of mind while traveling', 'Socialization for your pet', 'Personalized care routines', 'No kennel stress'],
    faqs: [
      { question: 'What should I bring for my pet?', answer: 'Bring their regular food, any medications, a favorite toy or blanket, and vaccination records.' },
      { question: 'How are emergencies handled?', answer: 'All sitters have access to emergency vet contacts and will notify you immediately of any concerns.' },
      { question: 'Can I get updates during the stay?', answer: 'Yes! Sitters send daily photo and video updates so you can see how your pet is doing.' },
    ],
  },
  {
    _id: '2', title: 'Dog Walking', slug: 'dog-walking', icon: '🐕',
    color: 'from-purple-500 to-pink-500',
    description: 'Daily walks to keep your pup happy & healthy',
    longDescription: 'Keep your dog active and happy with professional dog walking services. Our experienced walkers provide regular exercise, socialization opportunities, and GPS-tracked walks so you can see exactly where your pup went.',
    pricing: { basePrice: 25, currency: 'USD', unit: 'walk' },
    duration: '30-60 minutes per walk',
    features: ['GPS-tracked walks', 'Flexible scheduling', 'Post-walk report cards', 'Solo or group walks', 'Rain or shine reliability', 'Key pickup available'],
    benefits: ['Regular exercise for your dog', 'Reduced destructive behavior', 'Socialization with other dogs', 'Consistent routine'],
    faqs: [
      { question: 'How long are the walks?', answer: 'Standard walks are 30 minutes. Extended walks of 45-60 minutes are also available.' },
      { question: 'Do you walk multiple dogs at once?', answer: 'We offer both solo and small group walks (max 3 dogs). You choose what works best for your pup.' },
      { question: 'What happens in bad weather?', answer: 'Our walkers come rain or shine. In extreme conditions, we will contact you to discuss alternatives.' },
    ],
  },
  {
    _id: '3', title: 'Pet Daycare', slug: 'pet-daycare', icon: '☀️',
    color: 'from-amber-500 to-orange-500',
    description: 'Daytime supervision, play & socialization',
    longDescription: 'A fun-filled day for your pet while you are at work! Our daycare providers offer structured play, socialization, rest periods, and mental stimulation in safe, pet-proofed environments.',
    pricing: { basePrice: 35, currency: 'USD', unit: 'day' },
    duration: 'Full day (8-10 hours)',
    features: ['Structured play sessions', 'Socialization activities', 'Supervised rest time', 'Meal and snack service', 'Indoor and outdoor play', 'Webcam access'],
    benefits: ['Eliminates separation anxiety', 'Burns excess energy', 'Professional supervision', 'Your pet makes friends'],
    faqs: [
      { question: 'What are the daycare hours?', answer: 'Standard hours are 7 AM to 6 PM. Early drop-off and late pick-up may be available.' },
      { question: 'Is my pet temperament-matched?', answer: 'Yes! We assess all pets and group them by size, energy level, and play style.' },
      { question: 'What if my pet does not get along with others?', answer: 'Solo daycare is available for pets who prefer individual attention.' },
    ],
  },
  {
    _id: '4', title: 'Grooming', slug: 'grooming', icon: '✂️',
    color: 'from-emerald-500 to-teal-500',
    description: 'Professional grooming for all breeds',
    longDescription: 'Keep your pet looking and feeling their best with professional grooming services. From basic baths to full breed-specific styling, our certified groomers handle it all with patience and care.',
    pricing: { basePrice: 55, currency: 'USD', unit: 'session' },
    duration: '1-3 hours depending on service',
    features: ['Breed-specific styling', 'Nail trimming', 'Ear cleaning', 'Teeth brushing', 'De-shedding treatments', 'Hypoallergenic shampoos'],
    benefits: ['Healthier skin and coat', 'Early detection of skin issues', 'Reduced shedding at home', 'Your pet looks amazing'],
    faqs: [
      { question: 'How often should my pet be groomed?', answer: 'Most dogs benefit from grooming every 4-8 weeks. Long-haired breeds may need more frequent visits.' },
      { question: 'Do you groom cats?', answer: 'Yes! We offer cat grooming including baths, brushing, nail trims, and lion cuts.' },
      { question: 'What if my pet is anxious about grooming?', answer: 'Our groomers are trained in fear-free handling techniques and will go at your pet\'s pace.' },
    ],
  },
  {
    _id: '5', title: 'Pet Training', slug: 'pet-training', icon: '🎓',
    color: 'from-rose-500 to-red-500',
    description: 'Behavioral training from certified pros',
    longDescription: 'Transform your pet\'s behavior with certified professional trainers. We use positive reinforcement methods to teach obedience, address behavioral issues, and strengthen the bond between you and your pet.',
    pricing: { basePrice: 65, currency: 'USD', unit: 'session' },
    duration: '45-60 minutes per session',
    features: ['Positive reinforcement methods', 'Basic obedience training', 'Behavioral modification', 'Puppy socialization classes', 'In-home or facility sessions', 'Progress tracking'],
    benefits: ['Better behaved pet', 'Stronger pet-owner bond', 'Safer interactions', 'Reduced anxiety and stress'],
    faqs: [
      { question: 'What age can training start?', answer: 'Puppies can start basic training as early as 8 weeks. It is never too late to train an older dog!' },
      { question: 'How many sessions will my pet need?', answer: 'Most basic obedience programs are 6-8 sessions. Behavioral issues may require more.' },
      { question: 'Do you train cats?', answer: 'Yes! Cats can learn tricks, use puzzle feeders, and modify unwanted behaviors through training.' },
    ],
  },
  {
    _id: '6', title: 'Vet Visits', slug: 'vet-visits', icon: '🏥',
    color: 'from-cyan-500 to-blue-500',
    description: 'We take your pet to vet appointments',
    longDescription: 'Cannot make it to the vet? Our trusted sitters will transport your pet safely to veterinary appointments, stay with them during the visit, and bring them home with a full report of the visit.',
    pricing: { basePrice: 40, currency: 'USD', unit: 'visit' },
    duration: '2-4 hours (including transport)',
    features: ['Safe pet transport', 'Vet appointment accompaniment', 'Post-visit report', 'Medication pickup', 'Follow-up care coordination', 'Emergency vet trips'],
    benefits: ['Never miss an appointment', 'Reduced stress for your pet', 'Detailed health reports', 'Professional handling'],
    faqs: [
      { question: 'Will you stay during the appointment?', answer: 'Yes, our sitters stay with your pet throughout the entire vet visit and take notes.' },
      { question: 'Can you pick up medications?', answer: 'Absolutely! We can pick up prescriptions from the vet or pet pharmacy.' },
      { question: 'What about emergency vet visits?', answer: 'We offer emergency transport services. Contact us immediately and we will arrange the fastest option.' },
    ],
  },
];

const defaultProviders = [
  { _id: 'p1', name: 'Alex Thompson', rating: 4.9, reviews: 127, price: 35, avatar: 'A', city: 'San Francisco', bio: 'Certified dog trainer with 5+ years experience', services: ['pet-boarding', 'dog-walking', 'pet-daycare'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { _id: 'p2', name: 'Maria Garcia', rating: 4.8, reviews: 98, price: 30, avatar: 'M', city: 'Oakland', bio: 'Passionate about feline care, vet tech background', services: ['pet-boarding', 'grooming', 'vet-visits'], verified: true, availability: ['Mon', 'Wed', 'Fri', 'Sat'] },
  { _id: 'p3', name: 'David Chen', rating: 4.9, reviews: 156, price: 40, avatar: 'D', city: 'Berkeley', bio: '8 years of professional pet sitting experience', services: ['pet-boarding', 'dog-walking', 'pet-daycare', 'pet-training'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  { _id: 'p4', name: 'Lisa Park', rating: 4.7, reviews: 84, price: 45, avatar: 'L', city: 'Palo Alto', bio: 'Specialized in puppy training and socialization', services: ['pet-training', 'dog-walking'], verified: true, availability: ['Tue', 'Thu', 'Sat', 'Sun'] },
  { _id: 'p5', name: 'Sara Johnson', rating: 4.8, reviews: 45, price: 50, avatar: 'S', city: 'San Francisco', bio: 'Expert care for all types of pets', services: ['grooming', 'vet-visits', 'pet-boarding'], verified: true, availability: ['Mon', 'Tue', 'Wed', 'Fri'] },
  { _id: 'p6', name: 'Ryan Kim', rating: 4.9, reviews: 112, price: 38, avatar: 'R', city: 'Fremont', bio: 'Gentle care for senior pets with special needs', services: ['pet-boarding', 'vet-visits', 'dog-walking'], verified: true, availability: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
];

// GET /api/services — list all
router.get('/', (req, res) => {
  res.json({ success: true, services: defaultServices });
});

// GET /api/services/:slug
router.get('/:slug', (req, res) => {
  const service = defaultServices.find(s => s.slug === req.params.slug);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, service });
});

// GET /api/services/:slug/providers
router.get('/:slug/providers', (req, res) => {
  const providers = defaultProviders.filter(p => p.services.includes(req.params.slug));
  res.json({ success: true, providers });
});

module.exports = router;
