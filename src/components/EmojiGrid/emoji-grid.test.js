import React from 'react';
import { shallow } from 'enzyme';
import EmojiGrid from './emoji-grid';

describe('EmojiGrid component', () => {
    const gridContainer = shallow(<EmojiGrid width="2" height="2" 
            totalCount={4}
            currentEmoji={':)'}
            brushActive={true} />);
	it('renders without throwing', () => {
		shallow(<EmojiGrid />);
	});

	it('EmojiGrid renders correct number of grid boxes', () => {
		expect(gridContainer.find('div.grid-container').children().length).toBe(4);
	});

	it('clicking on any grid box triggers gridBoxClicked()', () => {
		const gridBoxClicked = jest.spyOn(EmojiGrid.prototype, 'gridBoxClicked');
        (gridContainer.find('div.grid-container').children().first()).simulate('click');
        expect(gridBoxClicked).toHaveBeenCalled();
        expect(gridBoxClicked).toHaveBeenCalledWith(0);
    });
});
