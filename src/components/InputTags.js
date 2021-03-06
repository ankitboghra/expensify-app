import React from 'react';

class InputTag extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tags = this.props.tags;

        return (
            <div className="input-tag">
                <ul className="input-tag__tags">
                    {tags && tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                            <button
                                type="button"
                                onClick={() => { this.props.onTagRemove(i); }}>
                                +
                            </button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input">
                        <input
                            type="text"
                            placeholder="Tags"
                            onChange={this.props.onTagValueChange}
                            onKeyDown={this.props.onTagInputKeyDown}
                            value={this.props.tagInput}
                            list="tags-data-list" />
                    </li>
                </ul>
                {
                    this.props.dataList && 
                    <datalist id="tags-data-list">
                        {this.props.dataList.map(tag => <option key={`dl-${tag}`}>{tag}</option>)}
                    </datalist>
                }
            </div>
        );
    }
}

export default InputTag;
