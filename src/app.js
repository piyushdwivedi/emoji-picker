import React, { Component } from 'react';

import EmojiPaint from './../src/components/EmojiPaint/emoji-paint';

import './app.css';

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

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<EmojiPaint emoji={EMOJI} />
			</div>
		);
	}
}
