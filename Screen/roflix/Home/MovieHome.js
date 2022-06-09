import React, { Component } from 'react';
import { Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../../value/Constants';
import { StatusBar } from 'react-native';
// import V2Loading from './miniComponent/V2Loading';
import { Icon } from 'native-base';
import { getPopularMovie, getTopRateMovie } from '../Manager/ConnectionManager';
import NoDataPlaceHolder from '../Atomic/NoDataPlaceHolder';
import ImageWithTitle from '../Atomic/ImageWithTitle';
import { ScrollView } from 'react-native-gesture-handler';
import MovieSectionTitle from '../Atomic/MovieSectionTitle';

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
    }


    renderPopMovieData = ({ item, index }) => {
        const { selectedId } = this.state
        const { bigData } = this.props
        console.log("renderred:", bigData[item]);
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
        const { theme, popularMovieData } = this.props

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                <StatusBar
                    backgroundColor={themeColor[theme]['statusBar']}
                    barStyle={theme == 'dark' ? 'light-content' : "dark-content"} />
                <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                    <View
                        style={styles.headerContiner}
                    >
                        <View
                            style={{ flex: 1 }}
                        >
                        </View>
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
                                data={popularMovieData.slice(0, 12)}
                                renderItem={this.renderPopMovieData}
                            />
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
const updateBigData = bigData => ({
    type: 'UPDATE_BIGDATA',
    payload: {
        bigData
    }
});
const mapStateToProps = state => {
    const { theme, dataProfile, popularMovieData, bigData } = state;
    return { theme, dataProfile, popularMovieData, bigData };
};

export default connect(mapStateToProps,
    {
        updateBigData,
        updatePopularMovieData
    })(MovieHome);

const styles = StyleSheet.create({
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
});