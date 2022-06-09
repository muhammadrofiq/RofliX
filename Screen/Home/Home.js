import React, { Component, Fragment } from 'react';
import { Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../value/Constants';
import { StatusBar } from 'react-native';
// import V2Loading from './miniComponent/V2Loading';
import { Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { ceil } from 'react-native-reanimated';
import HomeComponent from './HomeComponent';
import BookmarkComponent from './BookmarkComponent';

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

class Home extends Component {

    urlApi = 'https://hc.transtv.co.id/rest';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            perusahaan: null,
            loading: false,
            home: true
        }
    }


    componentDidMount() {
    }

    render() {
        const { data, loading, home } = this.state;
        const { theme } = this.props

        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#00A3FF' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                        <StatusBar
                            backgroundColor={"#00A3FF"}
                            barStyle={'light-content'} />
                        {
                            home ?
                                <HomeComponent
                                    parentProps={this.props}
                                />
                                :
                                <BookmarkComponent
                                    parentProps={this.props}
                                />
                        }

                        {/* <View
                            style={{ flex: 1 }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#00A3FF",
                                    borderBottomRightRadius: SZ24,
                                    borderBottomLeftRadius: SZ24,
                                }}
                            >
                                <View
                                    style={{
                                        marginHorizontal: SZ24,
                                    }}
                                >
                                    <Text style={{
                                        color: "#fff",
                                        fontFamily: "SFProText-Regular",
                                        fontSize: SZ16,
                                        lineHeight: SZ24,
                                        fontWeight: '400'
                                    }}>Hi Rofiq</Text>
                                    <Text style={{
                                        marginTop: SZ1 * 4,
                                        color: "#fff",
                                        fontFamily: "SFProText-Regular",
                                        fontSize: SZ1 * 18,
                                        lineHeight: SZ24,
                                        fontWeight: '800',
                                        marginBottom: SZ1 * 8

                                    }}>Welcome Back 👋</Text>

                                </View>

                                <View
                                    style={{
                                        marginHorizontal: SZ1 * 16,
                                        marginBottom: SZ1 * 14,
                                        backgroundColor: "#FFFFFF70",
                                        borderRadius: SZ24,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginHorizontal: SZ1 * 8,
                                            marginVertical: SZ1 * 8
                                        }}
                                    >

                                        <View
                                            style={{
                                                flex: 1.4,
                                                // backgroundColor: "#eaeaea",
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >

                                            <Icon
                                                name="search"
                                                style={{
                                                    color: '#fff',
                                                    fontSize: SZ8 / 8 * 24,
                                                }} />
                                        </View>
                                        <View
                                            style={{
                                                flex: 9,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <TextInput
                                                placeholder='What are you searching for ?'
                                                placeholderTextColor={'#ffffff90'}
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    backgroundColor: themeColor[theme]['homeBg'],
                                    marginHorizontal: SZ24
                                }}
                            >
                            </ScrollView>
                        </View> */}

                        <View
                            style={{
                                backgroundColor: "#fff",
                                borderTopRightRadius: SZ24,
                                borderTopLeftRadius: SZ24,
                            }}
                        >
                            <View
                                style={{
                                    marginVertical: SZ12,
                                    flexDirection: 'row'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            home: true
                                        })
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon
                                        type='Feather'
                                        name="home"
                                        style={{
                                            color: home ? '#00A3FF' : '#a7a7a7',
                                            fontSize: SZ8 / 8 * 24,
                                        }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            home: false
                                        })
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Icon

                                        type='SimpleLineIcons'
                                        name="star"
                                        style={{
                                            color: home ? '#a7a7a7' : '#00A3FF',
                                            fontSize: SZ8 / 8 * 24,
                                        }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { theme, bookmark } = state;
    return { theme, bookmark };
};

export default connect(mapStateToProps)(Home);

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