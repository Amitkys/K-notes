const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
    {
        text: { type: String, required: true },
        title: { type: String },
        date: { type: Date, default: Date.now },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
);

// Pre-save middleware to set the title if not provided
noteSchema.pre('save', async function(next) {
    if (!this.title) {
        const userId = this.userId;

        // Count existing untitled notes to create a unique title
        const untitledCount = await mongoose.model('Note').countDocuments({
            userId: userId,
            title: /^untitled\d*$/
        });

        this.title = `untitled${untitledCount + 1}`;
    }
    next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
