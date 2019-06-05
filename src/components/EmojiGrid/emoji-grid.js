import React, { Component } from 'react';
import './emoji-grid.css';

class EmojiGrid extends Component {
    constructor(props) {
        super(props);
        this.clearEmojis = this.clearEmojis.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.state = {
            height: this.props.height,
            width: this.props.width,
            gridItems: Array.from(new Array(this.props.totalCount)).map(item => {
                return {
                    emoji: ''
                }
            }),
            activeGridIndexes: [],
            mouseDown: false
        }
    }
    /**
     * rebuild "gridItems" list to re-render the grid and its items
     * @param {object} nextProps - set of new props coming in
     * @param {object} prevState - previous stored state
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.height !== prevState.height || nextProps.width !== prevState.width) {
            return {
                height: nextProps.height,
                width: nextProps.width,
                gridItems: Array.from(new Array(nextProps.height*nextProps.width)).map(item => {
                    return {
                        emoji: ''
                    }
                })
            }
        }
        return null;
    }
    /**
     * Creates a clone of the items from state to avoid mutating the state directly.
     * Populate the grid box with emoji and add index to activeGridIndexes list.
     * @param {number} index - index of the grid box clicked
     * NOTE: This function could have been separated out for eraser and brush.
     * That would have helped avoid having these many if/else loops. 
     */
    gridBoxClicked(index) {
        // basic validation to provide user with feedback
        if(!this.props.brushActive && !this.props.eraserActive) {
            alert('Please select brush to paint or eraser to clean');
        } else {
            let gridItems = [...this.state.gridItems];
            let activeGridIndexes = [...this.state.activeGridIndexes];
            // when you try to paint
            if(this.props.brushActive) {
                // only push to activeGridIndexes list if index isnt already present
                if(activeGridIndexes.indexOf(index) === -1) {
                    activeGridIndexes.push(index);
                }
                gridItems[index].emoji = gridItems[index].emoji ? gridItems[index].emoji : this.props.currentEmoji;
            } else if(this.props.eraserActive){ // when you try to erase
                // before trying to clear, check if there are any emojis in grid
                if(activeGridIndexes.length) {
                    let indexOfItem = activeGridIndexes.indexOf(index);
                    // add check to make sure we don't end up deleting items from end of list
                    // since slice and splice remove items from end of list when given a negative index
                    if(indexOfItem > -1) {
                        activeGridIndexes.splice(indexOfItem, 1);
                        gridItems[index].emoji = '';
                    } else {
                        // 'No emoji to erase here!' msg;
                    }
                } else {
                    alert('No emojis to clear in the grid. Please add one first.');
                }

            }
            this.setState(() => ({ gridItems, activeGridIndexes }));
        }
        
    }

    /**
     * This method emulates the click-and-hold behavior in a way
     * @param {boolean} value - to indicate if user is holding and dragging mouse 
     */
    mouseDownActivated(value) {
        this.setState(() => ({mouseDown: value}));
    }

    /**
     * If click-and-hold is active, then paint/erase the activeEmoji.
     * @param {number} index - index of grid box thats entered 
     */
    gridBoxEntered(evt, index) {
        if(this.state.mouseDown) {
            if(this.props.brushActive || this.props.eraserActive) {
                this.gridBoxClicked(index)
            }
        }
    }

    /**
     * Loops through the activeGridIndexes list to clear
     * emojis on the grid.
     */
    clearEmojis() {
        let gridItems = Array.from(new Array(this.props.totalCount)).map(item => {
            return {
                emoji: ''
            }
        })
        let activeGridIndexes = [];
        this.setState(() => ({ gridItems, activeGridIndexes }));
    }

    /**
     * Copy all contents from the grid to the clipboard
     */
    copyToClipboard(lastColIndexList) {
        let clipBoardString = '';
        this.state.gridItems.forEach((item, index) => {
            // Beautify copied content - add new line for every new row in grid
            let addNewLine = lastColIndexList.indexOf(index) > -1 ? '\n' : ' ';
            let stringToAppend = item.emoji ? item.emoji : ':blank:';
            clipBoardString += stringToAppend + addNewLine;
        })
        // use navigator.clipboard API (supported on most browsers)
        navigator.clipboard && navigator.clipboard.writeText(clipBoardString).then(resp => {
            alert('All grid content copied to clipboard! Try pasting now.');
        })
    }
    render() {
        // get first item's index in last row
        let lastRowIndex = this.state.gridItems.length - this.props.width;

        // // get last items index in last column
        let lastColIndex = this.props.width - 1;
        let lastColIndexList = [];
        for(let i=0; i< this.props.height; i++) {
            lastColIndexList.push(lastColIndex);
            lastColIndex += this.props.width;
        }
        return (
            <React.Fragment>
                <div className="grid-container" 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(' + this.props.width + ', 41px)',
                            gridTemplateRows: 'repeat(' + this.props.height + ', 40px)',
                            justifyContent: 'center',
                            padding: '20px'
                        }}>
                    {this.state.gridItems.length && this.state.gridItems.map((item,index) => (
                        <div key={index+'box'} 
                             className={"grid-boxes " + (index >= lastRowIndex  ?  'last_row ' : '') + 
                                        (lastColIndexList.indexOf(index) > -1  ?  'last_column ' : '') + 
                                        (index === this.props.width -1  ?  'top-right ' : '') + 
                                        (index === this.props.width * (this.props.height-1)  ?  'bottom-left' : '')} 
                             onClick={() => this.gridBoxClicked(index)}
                             onMouseDown={() => this.mouseDownActivated(true)}
                             onMouseUp={() => this.mouseDownActivated(false)}
                             onMouseEnter={(evt) => this.gridBoxEntered(evt, index)}>
                            <span className="emoji-paint_grid">{item.emoji}</span>
                        </div>
                    ))}
                </div>
                <div className="emoji_paint_footer">
                    <button className="emoji_paint_clear_button" onClick={this.clearEmojis}>Clear</button>
                    <button className="emoji_paint_copy_button" onClick={() => this.copyToClipboard(lastColIndexList)}>Copy to Clipboard</button>
                </div>
            </React.Fragment> 
        )
    }
}
export default EmojiGrid;