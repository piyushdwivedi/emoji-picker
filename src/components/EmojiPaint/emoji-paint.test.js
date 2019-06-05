import React from 'react';
import { shallow } from 'enzyme';
import EmojiPaint from './emoji-paint';

describe('EmojiGrid component', () => {
    const EMOJI = [
        '😀',
        '😁',
        '😎',
        '😘',
        '⬆️',
        '➡️',
        '⬇️',
        '⬅️',
        '⚪',
        '⚫',
        '🔴',
        '🔵',
    ];
    const emojiPaint = shallow(<EmojiPaint emoji={EMOJI} />);
    emojiPaint.setState({
        activeEmoji: EMOJI[0],
        height: 10,
        isEmojiPickerShowing: false,
        width: 8,
        brushActive: false,
        eraserActive: false,
        invalidWidth: false,
        invalidHeight: false
    });
    
    it('renders without throwing', () => {
		shallow(<EmojiPaint emoji={EMOJI} />);
    });
    
    it('test that toggleEmojiPicker() toggles the isEmojiPickerShowing from state', () => {
        emojiPaint.instance().toggleEmojiPicker();
        let isEmojiPickerShowing = emojiPaint.state().isEmojiPickerShowing;
        expect(isEmojiPickerShowing).toBeTruthy();
    });
    
    it('updateActiveEmoji(newEmoji) updates states active emoji to be newEmoji', () => {
        emojiPaint.instance().updateActiveEmoji(EMOJI[2]);
        let newEmoji = emojiPaint.state().activeEmoji;
        let isEmojiPickerShowing = emojiPaint.state().isEmojiPickerShowing;
        expect(newEmoji).toBe(EMOJI[2]);
        expect(isEmojiPickerShowing).toBeFalsy();
    });
    
    it('onSizeChange() updated height/width in state', () => {
        emojiPaint.instance().onSizeChange({
            height: 5,
            width: 10
        });
        let height = emojiPaint.state().height;
        let width = emojiPaint.state().width;
        expect(height).toBe(5);
        expect(width).toBe(10);
    });
});
