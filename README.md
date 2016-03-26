## React Native Floating Label Text Input

### What is this?
This component will render an iOS styled text field with floating label animation. When there is no value, the placeholder will be centered. Once there is a value, the value will slide down and the label will fade in and slide up.

Credits for the concept to Matt D. Smith ([@mds](http://www.twitter.com/mds)), and his [original design](http://dribbble.com/shots/1254439--GIF-Mobile-Form-Interaction?list=users).

<p align="center">
    <img src ="http://i.imgur.com/5dddNix.gif" />
</p>

### Installation
```npm install react-native-floating-label-text-input --save```

### Usage example

```javascript
var FloatLabelTextInput = require('react-native-floating-label-text-input');

var SomeComponent = React.createClass({
  render: function() {
    return (
      <View>
        <FloatLabelTextInput
          placeHolder={"name of field"}
          value={"value of field"}
          onFocus={@myFocusFunction}
          onBlur={@onBlurFunction}
        />
      </View>
    );
  }
});
```

### Component props
- `placeHolder` (String) - String that will be used as the placeholder if there is no value. It will also be the string used for the label when there is a value.
- `value` (String) - Value of the text input.
- `onFocus` (Function) - Function to be called on focus.
- `onBlur` (Function) - Function to be called on blur.
- `onChangeTextValue` (Function) - Function to be called when text is modified.
- `style` (Stylesheet) - Override the default styling

### Questions/Bugs/Ideas?
Feel free to open an issue on github, send suggestions, fork this repository or contact me at eyal.eizenberg@samanage.com

This package was developed during my work at [Samanage](http://www.samanage.com/).

Thanks and Enjoy! :)