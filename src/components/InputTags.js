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
                    {tags.map((tag, i) => (
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
                            value={this.props.tagInput} />
                    </li>
                </ul>
            </div>
        );
    }
}

export default InputTag;