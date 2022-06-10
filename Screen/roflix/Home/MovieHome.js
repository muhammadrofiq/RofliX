import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { theme as themeColor } from '../../../value/Constants';
import { StatusBar } from 'react-native';
import { getPopularMovie, getPopularTV, getTopRateMovie } from '../Manager/ConnectionManager';
import NoDataPlaceHolder from '../Atomic/NoDataPlaceHolder';
import ImageWithTitle from '../Atomic/ImageWithTitle';
import { ScrollView } from 'react-native-gesture-handler';
import MovieSectionTitle from '../Atomic/MovieSectionTitle';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from 'native-base';
import ImageWithTitleTV from '../Atomic/ImageWithTitleTV';
import { lowerFirst } from 'lodash';

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

class MovieHome extends Component {

    urlApi = 'https://hc.transtv.co.id/rest';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            perusahaan: null,
            loading: false,
            selectedId: 0
        }
        this.sheetRef = React.createRef(null);
    }


    componentDidMount() {
        this.getInitialData()
        this.getTVData()
    }
    async getTVData() {
        const { popularTVData, TVBigData } = this.props
        const [popularTVResult] = await Promise.all([
            getPopularTV(popularTVData.page + 1),
        ]);
        var TVTemp = TVBigData
        var popularTV = popularTVData.data
        popularTVResult.results.forEach(item => {
            if (!(item.id in TVTemp)) {
                TVTemp[item.id] = item
            }
            popularTV.push(item.id)
        });
        this.props.updatePopularTV({
            data: popularTV,
            page: popularTVData.page + 1
        })

    }
    async getInitialData() {
        const { topRateMovieData, popularTVData, bigData } = this.props
        const [topRateMovieResult, popular] = await Promise.all([
            getTopRateMovie(topRateMovieData.page + 1),
            getPopularMovie(1),
        ]);
        var temp = bigData
        var rateData = topRateMovieData.data
        var popularData = []
        topRateMovieResult.results.forEach(item => {
            if (!(item.id in temp)) {
                temp[item.id] = item
            }
            rateData.push(item.id)
        });
        popular.results.forEach(item => {
            if (!(item.id in temp)) {
                temp[item.id] = item
            }
            popularData.push(item.id)
        });
        this.props.updateBigData(temp)
        this.props.updatePopularMovieData(popularData)
        this.props.updateTopRateMovieData({
            data: rateData,
            page: topRateMovieData.page + 1
        })
    }


    renderMovie = ({ item, index }) => {
        const { selectedId } = this.state
        const { bigData } = this.props
        return (
            <ImageWithTitle
                pressed={(item) => {
                    this.props.updateSelectedItem(item.id)
                    this.props.navigation.navigate("DetailMovie")
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
    renderTV = ({ item, index }) => {
        const { selectedId } = this.state
        const { TVBigData, watchList } = this.props
        return (
            <ImageWithTitleTV
                pressed={(item) => {
                    console.log('gede Pressed')
                }}
                lovePressed={(pressedItem) => {
                    var tempData = watchList.data
                    // console.log(tempData);
                    // console.log(pressedItem.id);
                    // console.log(pressedItem.id);
                    if (tempData.includes(pressedItem.id)) {
                        const find = tempData.indexOf(pressedItem.id);
                        if (find > -1) {
                            tempData.splice(find, 1);
                        }
                    } else {
                        tempData.push(pressedItem.id)
                    }


                    this.props.updateWatchList({
                        data: tempData
                    })
                }}
                isSelected={watchList.data.includes(item)}
                index={index}
                item={TVBigData[item]}
                parentProps={this.props}
            />
        )
    };

    renderBottomSheetContent = (state, props) => {
        return (
            <View
                style={[styles.BottomSheetContent, {
                    backgroundColor: '#4F4F4Fee'
                }]}
            >
                <View style={styles.BottomSheetHeaderContainer}>
                    <View style={styles.BottomSheetHeader}></View>
                </View>
            </View>
        )
    }

    render() {
        const { data, loading } = this.state;
        const { theme, popularMovieData, topRateMovieData, popularTVData } = this.props
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                <StatusBar
                    backgroundColor={themeColor[theme]['statusBar']}
                    barStyle={theme == 'dark' ? 'light-content' : "dark-content"} />

                <BottomSheet
                    ref={this.sheetRef}
                    snapPoints={[(height) - 60, 0]}
                    initialSnap={1}
                    borderRadius={10}
                    renderContent={() => this.renderBottomSheetContent(this.state, this.props)}
                    enabledGestureInteraction={true}
                />
                <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                    <View
                        style={styles.headerContiner}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.sheetRef.current.snapTo(0)
                            }}
                            style={styles.menuIconContainer}
                        >
                            <Icon
                                name="menu-outline"
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <View
                            style={styles.titleContiner}
                        >
                            <Text
                                style={styles.titleText}
                            >RofliX</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.searchIconContiner}
                        >
                            <Icon
                                name="search-outline"
                                style={styles.searchIcon} />
                        </TouchableOpacity>

                    </View>
                    <ScrollView
                        style={{
                            flex: 1,
                            backgroundColor: themeColor[theme]['homeBg'],
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                marginHorizontal: SZ1 * 18

                            }}
                        >
                            <MovieSectionTitle
                                title={'POPULAR MOVIE'}
                            />
                            <FlatList
                                numColumns={3}
                                ListEmptyComponent={
                                    <NoDataPlaceHolder />
                                }
                                data={popularMovieData.slice(0, 6)}
                                renderItem={this.renderMovie}
                            />
                            <View style={styles.whiteLine} />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginHorizontal: SZ1 * 18

                            }}
                        >
                            <MovieSectionTitle
                                isShowAll={true}
                                title={'TOP RATED'}
                                pressed={() => {
                                    this.props.navigation.navigate("MovieList")
                                }}
                            />
                            <FlatList
                                numColumns={3}
                                ListEmptyComponent={
                                    <NoDataPlaceHolder />
                                }
                                data={topRateMovieData.data.slice(0, 6)}
                                renderItem={this.renderMovie}
                            />
                            <View style={styles.whiteLine} />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                marginHorizontal: SZ1 * 18

                            }}
                        >
                            <MovieSectionTitle
                                isShowAll={true}
                                title={'POPULAR SERIES'}
                                pressed={() => {
                                    this.props.navigation.navigate("MovieList")
                                }}
                            />
                            <FlatList
                                numColumns={2}
                                ListEmptyComponent={
                                    <NoDataPlaceHolder />
                                }
                                data={popularTVData.data.slice(0, 6)}
                                renderItem={this.renderTV}
                            />
                            <View style={styles.whiteLine} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const updatePopularMovieData = popularMovieData => ({
    type: 'UPDATE_POPULARMOVIE',
    payload: {
        popularMovieData
    }
});
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
const updateSelectedItem = selectedItemId => ({
    type: 'UPDATE_SELECTEDITEM',
    payload: {
        selectedItemId
    }
});
const updatePopularTV = popularTVData => ({
    type: 'UPDATE_POPULARTV',
    payload: {
        popularTVData
    }
});
const updateWatchList = watchList => ({
    type: 'UPDATE_WATCHLIST',
    payload: {
        watchList
    }
});
const mapStateToProps = state => {
    const { theme, dataProfile, popularMovieData, bigData, TVBigData, topRateMovieData, popularTVData, watchList } = state;
    return { theme, dataProfile, popularMovieData, bigData, TVBigData, topRateMovieData, popularTVData, watchList };
};

export default connect(mapStateToProps,
    {
        updateBigData,
        updatePopularMovieData,
        updateTopRateMovieData,
        updateSelectedItem,
        updatePopularTV,
        updateWatchList
    })(MovieHome);

const styles = StyleSheet.create({
    whiteLine: {
        marginTop: SZ1 * 14,
        borderWidth: SZ1 / 2,
        borderColor: "#fff",
        opacity: 0.4
    },
    headerContiner: {
        flexDirection: 'row',
        minHeight: SZ1 * 45,
        marginTop: SZ12,
    },
    titleContiner: {
        flex: 3,
        justifyContent: 'center',
        alignContent: 'center'
    },
    titleText: {
        fontSize: SZ1 * 40,
        textAlign: 'center',
        color: "#E50914",
        fontFamily: 'BebasNeue-Regular',
    },
    BottomSheetContent: {
        backgroundColor: 'white',
        height: (height) - 60,
        borderTopRightRadius: SZ24,
        borderTopLeftRadius: SZ24,
    },
    BottomSheetHeaderContainer: {
        marginTop: SZ8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomSheetHeader: {
        height: 3.5,
        width: 48,
        backgroundColor: "#a7a7a7",
        borderRadius: 3.5 / 2
    },
    menuIcon: {
        marginLeft: SZ1 * 12,
        color: '#F0F0F0',
        fontSize: SZ1 * 28,
    },
    menuIconContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    searchIconContiner: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
    },
    searchIcon: {
        marginRight: SZ1 * 12,
        color: '#F0F0F0',
        fontSize: SZ1 * 28,
    }
});