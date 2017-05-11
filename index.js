import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated
} from 'react-native';

class FloatingLabel extends React.Component {
  constructor(props) {
    super(props);

    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillReceiveProps(newProps) {
    Animated.timing(this.state.paddingAnim, {
      toValue: newProps.visible ? 5 : 9,
      duration: 230
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      toValue: newProps.visible ? 1 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.floatingLabel, { paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class TextFieldHolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillReceiveProps(newProps) {
    return Animated.timing(this.state.marginAnim, {
      toValue: newProps.withValue ? 10 : 0,
      duration: 230
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class FloatLabelTextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focussed: false,
      text: this.props.value
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.getAdditionalStyle = this.getAdditionalStyle.bind(this);
    this.render = this.render.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unsetFocus = this.unsetFocus.bind(this);
    this.labelStyle = this.labelStyle.bind(this);
    this.placeholderValue = this.placeholderValue.bind(this);
    this.setText = this.setText.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      text: newProps.value
    });
  }

  getAdditionalStyle(name) {
    if (this.props.style && this.props.style[name]) {
      return this.props.style[name];
    }

    return {};
  }

  render() {
    return (
      <View style={[styles.container, this.getAdditionalStyle('container')]}>
        <View style={[styles.viewContainer, this.getAdditionalStyle('viewContainer')]}>
          <View style={[styles.fieldContainer, this.getAdditionalStyle('fieldContainer')]}>
            <FloatingLabel visible={this.state.text}>
              <Text style={[styles.fieldLabel,
                            this.getAdditionalStyle('fieldLabel'),
                            this.labelStyle()]}>{this.placeholderValue()}
              </Text>
            </FloatingLabel>
            <TextFieldHolder withValue={this.state.text}>
              <TextInput
                  ref={textInput => this.textInput = textInput}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={this.getAdditionalStyle('placeholderTextColor')}
                  style={[styles.valueText, this.getAdditionalStyle('valueText')]}
                  value={this.props.value}
                  defaultValue={this.props.defaultValue}
                  maxLength={this.props.maxLength}
                  selectionColor={this.props.selectionColor}
                  onFocus={this.setFocus}
                  onBlur={this.unsetFocus}
                  onChange={this.onChange}
                  secureTextEntry={this.props.secureTextEntry}
                  password={this.props.password}
                  keyboardType={this.props.keyboardType}
                  autoCapitalize={this.props.autoCapitalize}
                  autoCorrect={this.props.autoCorrect}
                  underlineColorAndroid="transparent"
                  editable={this.props.editable}
              />
            </TextFieldHolder>
          </View>
        </View>
      </View>
    );
  }

  setFocus() {
    this.setState({
      focussed: true
    });
    try {
      return this.props.onFocus();
    } catch (_error) {}
  }

  unsetFocus() {
    this.setState({
      focussed: false
    });
    try {
      return this.props.onBlur();
    } catch (_error) {}
  }

  labelStyle() {
    if (this.state.focussed) {
      return this.props.style && this.props.style.focussed ? this.props.style.focussed : styles.focussed;
    }
  }

  placeholderValue() {
    if (this.state.text) {
      return this.props.placeholder;
    }
  }

  setText(value) {
    this.setState({
      text: value
    });

    this.textInput.setNativeProps(value);
  }

  onChange(event) {
    this.setText(event.nativeEvent.text);

    if (this.props.onChangeText) {
      this.props.onChangeText(event.nativeEvent.text);
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 45,
    justifyContent: 'center'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  floatingLabel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  fieldLabel: {
    height: 10,
    fontSize: 9,
    color: '#B1B1B1',
    paddingLeft: 15
  },
  fieldContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1 / 2,
    borderColor: '#C8C7CC',
    backgroundColor: 'white',
    paddingLeft: 15
  },
  valueText: {
    height: 20,
    fontSize: 16,
    color: '#111111'
  },
  focussed: {
    color: '#1482fe'
  }
});

module.exports = FloatLabelTextField;
