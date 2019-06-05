import React, { Component } from 'react';
import EmojiPicker from './../EmojiPicker/emoji-picker';

import './emoji-paint.css';
import EmojiGrid from '../EmojiGrid/emoji-grid';

const DEFAULT_HEIGHT = 8;
const DEFAULT_WIDTH = 10;

export default class App extends Component {
	constructor(props) {
		super(props);
		this.toggleEmojiPicker = this.toggleEmojiPicker.bind(this);
		this.updateActiveEmoji = this.updateActiveEmoji.bind(this);
		this.brushSelected = this.brushSelected.bind(this);
		this.eraserSelected = this.eraserSelected.bind(this);
		this.state = {
			activeEmoji: props.emoji[0],
			height: DEFAULT_HEIGHT,
			isEmojiPickerShowing: false,
			width: DEFAULT_WIDTH,
			brushActive: false,
			eraserActive: false,
			invalidWidth: false,
			invalidHeight: false
		};
	}

	/**
	 * Toggle the visibility of the emoji picker
	 */
	toggleEmojiPicker() {
		this.setState(({ isEmojiPickerShowing }) => ({
			isEmojiPickerShowing: !isEmojiPickerShowing,
		}));
	}

	/**
	 * Set the currently active emoji symbol
	 * @param {String} emoji - the next active emoji
	 */
	updateActiveEmoji(emoji) {
		this.setState(() => ({
			activeEmoji: emoji,
			isEmojiPickerShowing: false,
		}));
	}

	/**
	 * Update the canvas dimensions based on new height and/or width
	 * @param {Object} dimensions - new dimensions
	 * @param {Number} dimensions.height - next height value
	 * @param {Number} dimensions.width - next width value
	 */
	onSizeChange({ height, width }) {
		this.setState(() => ({ 
			height, 
			width,
			invalidHeight: false,
			invalidWidth: false
		}));
		
	}

	/** 
	 * Toggle the brushActive flag on state 
	 * to indicate if brush is active
	 */
	brushSelected() {
		this.setState((brushActive) => ({
			brushActive: true,
			eraserActive: false
		}))
	}

	/** 
	 * Toggle the eraserActive flag on state 
	 * to indicate if brush is active
	 */
	eraserSelected() {
		this.setState((eraserActive) => ({
			eraserActive: true,
			brushActive: false
		}))
	}
	
	/**
	 * Render the EmojiPaint component
	 * @return {ReactElement} - EmojiPaint element
	 */
	render() {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let suffix = hours >= 12 ? 'PM' : 'AM';
		hours = hours > 12 ? hours - 12: hours;
		let timeToDisplay = hours + ':' + minutes.toString().padStart(2, 0) +' '+suffix;
		return (
			<div className="emoji-paint">
				<div className="emoji-paint__toolbar">
					<div className="emoji-paint__controls">
						<button className="emoji-paint__control" onClick={this.toggleEmojiPicker}>
							{this.state.activeEmoji}
						</button>
						<button className="emoji-paint__control" onClick={this.brushSelected}>
							<img className="emoji-paint__control_icon" src="brush.png" alt="brush" />
						</button>
						<button className="emoji-paint__control" onClick={this.eraserSelected}>
							<img className="emoji-paint__control_icon" src="eraser.png" alt="eraser" />
						</button>
						{this.state.isEmojiPickerShowing && (
							<EmojiPicker
								emoji={this.props.emoji}
								onSelect={this.updateActiveEmoji}
								onClose={() => this.toggleEmojiPicker()}
							/>
						)}
					</div>
					<div>
						<label className={"emoji-paint__dimension " + (this.state.invalidWidth ? 'error' : '')}>
							Width
							<input
								type="text"
								className="emoji-paint__dimension_input"
								onChange={(e) => this.onSizeChange({ width: e.target.value, height: this.state.height })}
								defaultValue={this.state.width}
							/>
						</label>
						<label className={"emoji-paint__dimension " + (this.state.invalidHeight ? 'error' : '')}>
							Height
							<input
								type="text"
								className={"emoji-paint__dimension_input " + (this.state.invalidHeight ? 'error' : '')}
								onChange={(e) => this.onSizeChange({ height: e.target.value, width: this.state.width })}
								defaultValue={this.state.height}
							/>
						</label>
					</div>
				</div>
				<div className="emoji_paint_user">
					<img src="https://www.compulite.ca/wp-content/uploads/2016/02/slack-logo.png" alt="User Profile"></img>
					<span className="user_name">Slack User</span>
					<span className="current_time">{timeToDisplay}</span>
				</div>
				<div className="emoji_paint_grid">
						{(!this.state.invalidHeight && !this.state.invalidWidth) && 
						<EmojiGrid width={+this.state.width} height={+this.state.height} 
								   totalCount={+this.state.width* +this.state.height}
								   currentEmoji={this.state.activeEmoji}
								   brushActive={this.state.brushActive} eraserActive={this.state.eraserActive}/>}
				</div>
			</div>
		);
	}

}