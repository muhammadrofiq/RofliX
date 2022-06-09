import React, { Component } from 'react';
import { Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../../value/Constants';
import { StatusBar } from 'react-native';
import { Icon } from 'native-base';
import NoDataPlaceHolder from '../Atomic/NoDataPlaceHolder';
import ImageWithTitle from '../Atomic/ImageWithTitle';

const { width, height } = Dimensions.get('window');

const SZ8 = width / 100 * 2.13
const SZ1 = SZ8 / 8
const SZ12 = width / 100 * 3.2
const SZ13 = width / 100 * 3.466
const SZ16 = width / 100 * 4.266
const SZ20 = width / 100 * 5.333
const SZ24 = width / 100 * 6.4
const SZ48 = width / 100 * 12.8
const SZ112 = width / 100 * 30;
const SZ142 = width / 100 * 37.86;

class MovieList extends Component {

    urlApi = 'https://hc.transtv.co.id/rest';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            perusahaan: null,
            loading: false
        }
    }


    componentDidMount() {
    }


    renderMovie = ({ item, index }) => {
        const { selectedId } = this.state
        const { bigData } = this.props
        return (
            <ImageWithTitle
                pressed={(item) => {
                    console.log('pressed item:', item);
                    this.setState({
                        selectedId: item.id
                    })
                }}
                selectedId={selectedId}
                index={index}
                item={bigData[item]}
                parentProps={this.props}
            />
        )
    };

    render() {
        const { data, loading } = this.state;
        const { theme, popularMovieData, topRateMovieData } = this.props

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                    <StatusBar
                        backgroundColor={themeColor[theme]['statusBar']}
                        barStyle={theme == 'dark' ? 'light-content' : "dark-content"} />

                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => { this.props.navigation.goBack() }}
                        centerElement="Base"
                        style={{
                            container: {
                                backgroundColor: themeColor[theme]['homeBg'],
                                elevation: 0
                            },
                            titleText: {
                                color: themeColor[theme]['textColor'],
                                opacity: 0.7,
                                fontFamily: "SFProText-Regular",
                                fontSize: SZ16,
                                lineHeight: SZ24,
                                fontWeight: 'bold'
                            },
                            leftElement: {
                                color: themeColor[theme]['textColor'],
                                opacity: 0.7,
                                fontSize: SZ16,
                            }
                        }}
                    />

                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: SZ1 * 18
                        }}
                    >
                        <FlatList
                            numColumns={3}
                            ListEmptyComponent={
                                <NoDataPlaceHolder />
                            }
                            data={topRateMovieData.slice(0, 20)}
                            renderItem={this.renderMovie}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const {
        theme,
        popularMovieData,
        bigData,
        topRateMovieData
    } = state;
    return {
        theme,
        popularMovieData,
        bigData,
        topRateMovieData
    };
};

export default connect(mapStateToProps)(MovieList);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        flex: 1,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    lightText: {
        fontFamily: 'Montserrat-Light',
        color: "#000",
        width: 200,
        fontSize: 12
    },
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    isEmpty: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        flex: 1
    },
    textEmpty: {
        color: 'red',
        fontFamily: 'Montserrat-Light',
        fontWeight: 'bold'
    }
});