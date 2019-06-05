import React from 'react';

import './emoji-picker.css';

const EmojiPicker = (props) => (
	<div>
		<div className="emoji-picker">
			<ul className="emoji-picker__list">
				{props.emoji && props.emoji.map(symbol => (
					<li key={symbol}>
						<button className="emoji-picker__control" onClick={() => props.onSelect(symbol)}>
							{symbol}
						</button>
					</li>
				))}
			</ul>
			<span className="emoji-picker__caret" />
		</div>
		<div className="emoji-picker__shadow" onClick={props.onClose} />
	</div>
);
export default EmojiPicker;