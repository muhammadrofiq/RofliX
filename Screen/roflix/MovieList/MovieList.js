import React, { Component } from 'react';
import {
    Alert, View, Text, FlatList, StyleSheet,
    TouchableOpacity, Dimensions, SafeAreaView, ScrollView,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../../value/Constants';
import { StatusBar } from 'react-native';
import { Icon } from 'native-base';
import NoDataPlaceHolder from '../Atomic/NoDataPlaceHolder';
import ImageWithTitle from '../Atomic/ImageWithTitle';
import _ from 'lodash';
import { getTopRateMovie } from '../Manager/ConnectionManager';

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
            loading: false,
            isCanLoadMore: true,
            selectedId: 0
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
                }}
                selectedId={selectedId}
                index={index}
                item={bigData[item]}
                parentProps={this.props}
            />
        )
    };

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    async doFetch() {
        const { topRateMovieData, bigData } = this.props
        const [data] = await Promise.all([
            getTopRateMovie(topRateMovieData.page + 1),
        ]);
        var temp = bigData
        var rateData = topRateMovieData.data
        data.results.forEach(item => {
            if (!(item.id in temp)) {
                temp[item.id] = item
                rateData.push(item.id)
            } else {
                rateData.push(item.id)
            }
        });
        this.props.updateBigData(temp)
        this.props.updateTopRateMovieData({
            data: rateData,
            page: topRateMovieData.page + 1
        })
    }

    doSomething = _.debounce(() => {
        const { isCanLoadMore, page } = this.state
        const { topRateMovieData } = this.props
        if (topRateMovieData.data.length > 0) {
            if (isCanLoadMore) {
                this.doFetch()
                console.log("LOAD MORE");
            } else {
                console.log("CANT MPRE");
            }
        } else {
            console.log("NODATA");
        }
    }, 100);

    footer = () => {
        const { theme } = this.props
        const { loading, isCanLoadMore } = this.state
        return (
            <View style={{
                marginBottom: isCanLoadMore ? SZ48 : SZ12,
                marginTop: SZ8
            }}>
                {
                    isCanLoadMore ?
                        <ActivityIndicator size="large" color={themeColor[theme]['activityIndicator']} />
                        : null
                }
            </View>
        );
    }

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
                        centerElement="Top Rated Movie"
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
                            onScroll={({ nativeEvent }) => {
                                if (this.isCloseToBottom(nativeEvent)) {
                                    this.doSomething();
                                }
                            }}
                            data={topRateMovieData.data}
                            renderItem={this.renderMovie}
                            ListFooterComponent={this.footer}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const updateTopRateMovieData = topRateMovieData => ({
    type: 'UPDATE_TOPRATEMOVIE',
    payload: {
        topRateMovieData
    }
});
const updateBigData = bigData => ({
    type: 'UPDATE_BIGDATA',
    payload: {
        bigData
    }
});

const mapStateToProps = state => {
    const {
        theme,
        bigData,
        topRateMovieData
    } = state;
    return {
        theme,
        bigData,
        topRateMovieData
    };
};

export default connect(mapStateToProps, { updateTopRateMovieData, updateBigData })(MovieList);

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