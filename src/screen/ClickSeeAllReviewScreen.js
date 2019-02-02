import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import SingleHeaderComponent from '../components/SingleHeaderComponent';
import FlastListReviewComponent from '../components/FlastListReviewComponent';
class ClickSeeAllReviewScreen extends PureComponent {
  render() {
    const {
      container
    } = styles
    return (
      <SafeAreaView style={container}>
        <SingleHeaderComponent
          text='Đánh giá sản phẩm'
          iconLeft='md-arrow-round-back'
          onBackPress={() => { this.onBack() }}
        />
        <FlastListReviewComponent />
      </SafeAreaView>
    );
  }
  onBack() {
    this.props.navigation.goBack()
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default ClickSeeAllReviewScreen;