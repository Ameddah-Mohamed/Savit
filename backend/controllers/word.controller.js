import Word from './../models/word.model.js'

//tested they are all working.

export const getAllWords = async (req, res) => {
    try {
        const user = req.user; // Ensure req.user is populated correctly
        const words = await Word.find({ user }); // Find words for the specific user

        // If no words are found, return an empty array with a 200 status
        return res.status(200).json(words);
    } catch (error) {
        // Handle database errors or other exceptions
        console.error('Error fetching words:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const postWord = async (req, res) => {
    try {
        const user = req.user;
        const { word_content, type, definition } = req.body;

        const newWord = {
            user,
            word_content,
            type,
            definition,
            examples: [] // Initialize examples as an empty array
        };

        const response = await Word.create(newWord);
        return res.status(201).json(response); // Return the created word
        
    } catch (error) {
        console.error('Error creating word:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateWord = async (req, res) => {
    try {
        const { id:wordId } = req.params; // ID of the word to update
        const { word_content, type, definition } = req.body; // Fields to update

        // Create an update object with only the provided fields
        const updateFields = {};
        if (word_content !== undefined) updateFields.word_content = word_content;
        if (type !== undefined) updateFields.type = type;
        if (definition !== undefined) updateFields.definition = definition;

        // Update the word
        const updatedWord = await Word.findByIdAndUpdate(
            wordId,
            updateFields,
            { new: true } // Return the updated document
        );

        if (!updatedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }

        return res.status(200).json(updatedWord);
        
    } catch (error) {
        console.error('Error updating word:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteWord = async (req, res) => {
    try {
        const { id: wordId } = req.params; // Extract wordId from URL parameters

        // Delete the word by its unique _id
        const deletedWord = await Word.findByIdAndDelete(wordId);

        // If no word was found
        if (!deletedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }

        // Return success response
        return res.status(200).json({ message: 'Word deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting the word:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};