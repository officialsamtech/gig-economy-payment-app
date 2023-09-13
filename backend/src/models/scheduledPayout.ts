import mongoose from 'mongoose';

const ScheduledPayoutSchema = new mongoose.Schema({
    beneficiaryId: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true },
    nextPayoutDate: { type: Date, required: true },
    status: { type: String, default: 'active' },
});

const ScheduledPayout = mongoose.model('ScheduledPayout', ScheduledPayoutSchema);

export default ScheduledPayout;
