import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { theme as themeColor } from '../../../value/Constants';
import { StatusBar } from 'react-native';
import { getPopularMovie, getTopRateMovie } from '../Manager/ConnectionManager';
import NoDataPlaceHolder from '../Atomic/NoDataPlaceHolder';
import ImageWithTitle from '../Atomic/ImageWithTitle';
import { ScrollView } from 'react-native-gesture-handler';
import MovieSectionTitle from '../Atomic/MovieSectionTitle';
import BottomSheet from 'reanimated-bottom-sheet';
import { Icon } from 'native-base';

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
    }

    async getInitialData() {
        const [rate, popular] = await Promise.all([
            getTopRateMovie(1),
            getPopularMovie(1)
        ]);
        var bigData = {}
        var rateData = []
        var popularData = []
        rate.results.forEach(item => {
            if (!(item.id in bigData)) {
                bigData[item.id] = item
                rateData.push(item.id)
            }
        });
        popular.results.forEach(item => {
            if (!(item.id in bigData)) {
                bigData[item.id] = item
                popularData.push(item.id)
            }
        });
        this.props.updateBigData(bigData)
        this.props.updatePopularMovieData(popularData)
        this.props.updateTopRateMovieData(rateData)
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

    renderBottomSheetContent = (state, props) => {
        return (
            <View
                style={[styles.BottomSheetContent,{
                    backgroundColor:'#4F4F4Fee'
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
        const { theme, popularMovieData, topRateMovieData } = this.props

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
                                name="menu"
                                style={styles.menuIcon} />
                        </TouchableOpacity>
                        <View
                            style={styles.titleContiner}
                        >
                            <Text
                                style={styles.titleText}
                            >RofliX</Text>
                        </View>
                        <View
                            style={{ flex: 1 }}
                        >
                        </View>

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
                                data={topRateMovieData.slice(0, 6)}
                                renderItem={this.renderMovie}
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
const mapStateToProps = state => {
    const { theme, dataProfile, popularMovieData, bigData, topRateMovieData } = state;
    return { theme, dataProfile, popularMovieData, bigData, topRateMovieData };
};

export default connect(mapStateToProps,
    {
        updateBigData,
        updatePopularMovieData,
        updateTopRateMovieData,
        updateSelectedItem
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
        minHeight: SZ1 * 45
    },
    titleContiner: {
        flex: 3,
        justifyContent: 'center',
        alignContent: 'center'
    },
    titleText: {
        marginTop: SZ12,
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
        color: '#E50914',
        fontSize: SZ1 * 32,
    },
    menuIconContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});