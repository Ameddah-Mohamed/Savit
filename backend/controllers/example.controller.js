import Word from "./../models/word.model.js";
import Example from "./../models/example.model.js"


export const getExamplesForWord = async (req, res) => {
    try {
        const { id: wordId } = req.params; // Extract wordId from URL

        // Find the word and populate its examples
        const word = await Word.findById(wordId).populate('examples');

        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }

        // Return the examples associated with the word
        return res.status(200).json(word.examples);
        
    } catch (error) {
        console.error('Error fetching examples:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const postExample = async (req, res) => {
    try {
        const user = req.user; // Authenticated user
        const { id: wordId } = req.params; // Extract wordId from URL
        const { sentence, translation } = req.body; // Extract example data from request body

        // Check if the word exists
        const word = await Word.findById(wordId);
        if (!word) {
            return res.status(404).json({ message: 'Word not found' });
        }

        // Validate required field
        if (!sentence) {
            return res.status(400).json({ message: 'Sentence is required' });
        }

        // Create the example
        const newExample = await Example.create({
            word: wordId,
            sentence,
            translation, // This can be undefined
            user: user._id
        });

        // Add the example's ID to the word's examples array
        word.examples.push(newExample._id);
        await word.save();

        // Return the created example
        return res.status(201).json(newExample);
        
    } catch (error) {
        console.error('Error creating example:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateExample = async (req, res) => {
    try {
        const user = req.user; // Authenticated user
        const { id: exampleId } = req.params; // Extract exampleId from URL
        const { sentence, translation } = req.body; // Extract updated data from request body

        // Find the example and ensure it belongs to the authenticated user
        const example = await Example.findOne({ _id: exampleId, user: user._id });

        if (!example) {
            return res.status(404).json({ message: 'Example not found or unauthorized' });
        }

        // Create an update object with only the provided fields
        const updateFields = {};
        if (sentence !== undefined) updateFields.sentence = sentence;
        if (translation !== undefined) updateFields.translation = translation;

        // Update the example
        const updatedExample = await Example.findByIdAndUpdate(
            exampleId,
            updateFields,
            { new: true } // Return the updated document
        );

        return res.status(200).json(updatedExample);
        
    } catch (error) {
        console.error('Error updating example:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteExample = async (req, res) => {
    try {
        const user = req.user; // Authenticated user
        const { id: exampleId } = req.params; // Extract exampleId from URL

        // Find the example and ensure it belongs to the authenticated user
        const example = await Example.findOne({ _id: exampleId, user: user._id });

        if (!example) {
            return res.status(404).json({ message: 'Example not found or unauthorized' });
        }

        // Remove the example's ID from the associated word's examples array
        await Word.findByIdAndUpdate(
            example.word,
            { $pull: { examples: exampleId } } // Remove the example ID from the word's examples array
        );

        // Delete the example
        await Example.findByIdAndDelete(exampleId);

        // Return success response
        return res.status(200).json({ message: 'Example deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting example:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};