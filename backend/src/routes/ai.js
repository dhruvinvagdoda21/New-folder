const express = require('express');
const router = express.Router();
const Sitter = require('../models/Sitter');
const { protect } = require('../middleware/auth');

// AI Sitter Recommendation
router.post('/recommend', protect, async (req, res) => {
  try {
    const { petType, service, maxPrice, location } = req.body;
    let query = {};
    if (petType) query.petTypes = petType;
    if (service) query['services.name'] = service;

    let sitters = await Sitter.find(query)
      .populate('user', 'name email avatar address phone')
      .sort({ rating: -1, totalReviews: -1 });

    // Filter by price
    if (maxPrice) {
      sitters = sitters.filter(s =>
        s.services.some(sv => sv.price <= maxPrice)
      );
    }

    // Score-based ranking (AI simulation)
    const scored = sitters.map(sitter => {
      let score = 0;
      score += (sitter.rating || 0) * 20;
      score += Math.min(sitter.totalReviews || 0, 50);
      score += (sitter.experience || 0) * 5;
      score += sitter.isVerified ? 15 : 0;
      score += (sitter.totalBookings || 0) * 2;
      return { ...sitter.toObject(), aiScore: Math.min(score, 100) };
    });

    scored.sort((a, b) => b.aiScore - a.aiScore);

    res.json({ success: true, recommendations: scored.slice(0, 10) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// AI Pet Care Chatbot
router.post('/chatbot', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const lower = message.toLowerCase();
    let response = '';

    if (lower.includes('food') || lower.includes('diet') || lower.includes('feed')) {
      response = "🐾 For a balanced diet, ensure your pet gets high-quality protein, healthy fats, and essential vitamins. Dogs need about 25-30% protein, while cats need around 30-40%. Always provide fresh water and avoid chocolate, grapes, onions, and xylitol. Consult your vet for breed-specific dietary needs!";
    } else if (lower.includes('exercise') || lower.includes('walk') || lower.includes('play')) {
      response = "🏃 Most dogs need 30-60 minutes of exercise daily, depending on breed and age. Cats benefit from 15-20 minutes of interactive play. Regular exercise prevents obesity, reduces anxiety, and strengthens the bond between you and your pet!";
    } else if (lower.includes('groom') || lower.includes('bath') || lower.includes('brush')) {
      response = "✨ Regular grooming keeps your pet healthy! Brush dogs 2-3 times per week (daily for long-haired breeds). Bathe dogs every 4-6 weeks. Cats are self-groomers but benefit from weekly brushing. Don't forget nail trimming every 2-3 weeks!";
    } else if (lower.includes('vet') || lower.includes('sick') || lower.includes('health')) {
      response = "🏥 Regular vet checkups are essential — at least once a year for adults, twice for seniors. Watch for signs like lethargy, loss of appetite, excessive thirst, or behavioral changes. Keep vaccinations up to date and maintain a preventive care schedule!";
    } else if (lower.includes('train') || lower.includes('behavior') || lower.includes('obedien')) {
      response = "🎓 Positive reinforcement works best! Use treats, praise, and consistency. Start with basic commands: sit, stay, come. Keep training sessions short (5-10 min) and fun. Never punish — redirect unwanted behavior instead. Patience is key!";
    } else if (lower.includes('anxiet') || lower.includes('stress') || lower.includes('scared')) {
      response = "💙 Anxiety in pets is common. Create a safe space, maintain routines, and try calming aids like pheromone diffusers. For separation anxiety, practice gradual departures. Thunder shirts can help noise-phobic pets. Severe cases may need vet consultation.";
    } else {
      response = "🐾 I'm your PetConnect AI assistant! I can help with questions about pet nutrition, exercise, grooming, health, training, and behavior. What would you like to know about caring for your furry friend?";
    }

    res.json({ success: true, response, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
