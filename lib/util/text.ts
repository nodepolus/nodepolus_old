enum State{
    None,
    Color,
    Link
}

export default class Text {
    private _text: string = ''
    public state = State.None;
    constructor(initialText: string = ""){
        this._text = initialText;
    }
    public append(text: string): Text{
        this._text += text;
        return this;
    }
    /**
     * 
     * @param color Takes a 32-bit RGBA
     * @example appendColor("FF0000FF")
     */
    public appendColor(color: string): Text{
        if (color.length > 8) color = color.slice(0,8);
        color = color.padEnd(8,"F");
        if (this.state === State.Link) this.clearState();
        this._text += `[${color}]`;
        this.state = State.Color;
        return this;
    }
    public appendLink(link: string): Text{
        if (this.state === State.Color) this.clearState();
        this._text += `[${link}]`;
        this.state = State.Link;
        return this;
    }
    public clearState(): Text{
        this._text += "[]";
        this.state = State.None;
        return this;
    }
    set text(value){
        this._text = value;
        this.state = State.None;
    }
    get text(){
        return this._text;
    }
    toString(): string{
        return this._text;
    }
}