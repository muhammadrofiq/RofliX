import React, { Component, Fragment } from 'react';
import { Linking, Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from './../../../value/Constants';
import { StatusBar } from 'react-native';
// import V2Loading from './miniComponent/V2Loading';
import { Icon } from 'native-base';
import moment from 'moment';

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

class DetailBrew extends Component {

    urlApi = 'https://hc.transtv.co.id/rest';

    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data,
            perusahaan: null,
            loading: false
        }
    }


    componentDidMount() {
    }

    render() {
        const { data, loading } = this.state;
        const { theme } = this.props 
        var temp = moment(data.updated_at)
        console.log(temp.format("MMM, DD YYYY"))
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#00A3FF' }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                        <StatusBar
                            backgroundColor={"#00A3FF"}
                            barStyle={'light-content'} />
                        <View
                            style={{
                                backgroundColor: "#00A3FF",
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    marginVertical: SZ1 * 10,
                                    marginHorizontal: SZ12,
                                    flexDirection: 'row'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.goBack()
                                        }}
                                    >
                                        <Icon
                                            name="chevron-back"
                                            style={{
                                                color: '#fff',
                                                fontSize: SZ8 / 8 * 24,
                                            }} />
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        flex: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={{
                                        marginTop: SZ1 * 4,
                                        color: "#fff",
                                        fontFamily: "SFProText-Regular",
                                        fontSize: SZ1 * 18,
                                        lineHeight: SZ24,
                                        fontWeight: '800',
                                        marginBottom: SZ1 * 8

                                    }}>Brewery detail</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1.3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {
                                        data.website_url != null ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    // this.props.navigation.goBack()
                                                    if (data.website_url != null) {
                                                        Linking.openURL(data.website_url);
                                                    } else {
                                                        Alert.alert('Information', "There's no website link")
                                                    }
                                                }}
                                            >
                                                <Icon
                                                    name="link"
                                                    type='Entypo'
                                                    style={{
                                                        color: '#fff',
                                                        fontSize: SZ8 / 8 * 24,
                                                    }} />
                                            </TouchableOpacity> : null
                                    }

                                </View>

                            </View>
                            <View
                                style={{
                                    borderTopLeftRadius: SZ24,
                                    borderTopRightRadius: SZ24,
                                    backgroundColor: "#FFFFFFF0",
                                    flex: 1
                                }}
                            >
                                <View
                                    style={{
                                        marginTop: SZ1 * 30,
                                        marginHorizontal: SZ12
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom: SZ1 * 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginHorizontal: SZ12,
                                                color: "#111111",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ1 * 16,
                                                fontWeight: '600',
                                            }}
                                        >Name</Text>
                                        <View
                                            style={{
                                                marginVertical: SZ1 * 6,
                                                backgroundColor: "#fff",
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginHorizontal: SZ12,
                                                    marginVertical: SZ1 * 8,

                                                    color: "#676767",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',

                                                }}
                                            >{data.name}</Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            marginBottom: SZ1 * 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginHorizontal: SZ12,
                                                color: "#111111",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ1 * 16,
                                                fontWeight: '600',
                                            }}
                                        >Brewery type</Text>
                                        <View
                                            style={{
                                                marginVertical: SZ1 * 6,
                                                backgroundColor: "#fff",
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginHorizontal: SZ12,
                                                    marginVertical: SZ1 * 8,

                                                    color: "#676767",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',

                                                }}
                                            >{data.brewery_type}</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: SZ1 * 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginHorizontal: SZ12,
                                                color: "#111111",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ1 * 16,
                                                fontWeight: '600',
                                            }}
                                        >Address</Text>
                                        <View
                                            style={{
                                                marginVertical: SZ1 * 6,
                                                backgroundColor: "#fff",
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginHorizontal: SZ12,
                                                    marginVertical: SZ1 * 8,

                                                    color: "#676767",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',

                                                }}
                                            >{(data.street == null ? "" : data.street + ', ') + data.city + " - " + data.state}</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: SZ1 * 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginHorizontal: SZ12,
                                                color: "#111111",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ1 * 16,
                                                fontWeight: '600',
                                            }}
                                        >Updated Date</Text>
                                        <View
                                            style={{
                                                marginVertical: SZ1 * 6,
                                                backgroundColor: "#fff",
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginHorizontal: SZ12,
                                                    marginVertical: SZ1 * 8,

                                                    color: "#676767",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',

                                                }}
                                            >{(temp.format("MMM, DD YYYY"))}</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginBottom: SZ1 * 10
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginHorizontal: SZ12,
                                                color: "#111111",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ1 * 16,
                                                fontWeight: '600',
                                            }}
                                        >Website</Text>
                                        <View
                                            style={{
                                                marginVertical: SZ1 * 6,
                                                backgroundColor: "#fff",
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginHorizontal: SZ12,
                                                    marginVertical: SZ1 * 8,

                                                    color: "#676767",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ1 * 14,
                                                    fontWeight: '400',

                                                }}
                                            >{(data.website_url == null ? "Website URL Not found" : data.website_url)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Fragment>
            // <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
            //     <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
            //         {/* <V2Loading loading={loading} /> */}
            //         <StatusBar
            //             backgroundColor={themeColor[theme]['statusBar']}
            //             barStyle={theme == 'dark' ? 'light-content' : "dark-content"} />

            //         <Toolbar
            //             leftElement="arrow-back"
            //             onLeftElementPress={() => { this.props.navigation.goBack() }}
            //             centerElement="Detail"
            //             style={{
            //                 container: {
            //                     backgroundColor: themeColor[theme]['homeBg'],
            //                     elevation: 0
            //                 },
            //                 titleText: {
            //                     color: themeColor[theme]['textColor'],
            //                     opacity: 0.7,
            //                     fontFamily: "SFProText-Regular",
            //                     fontSize: SZ16,
            //                     lineHeight: SZ24,
            //                     fontWeight: 'bold'
            //                 },
            //                 leftElement: {
            //                     color: themeColor[theme]['textColor'],
            //                     opacity: 0.7,
            //                     fontSize: SZ16,
            //                 }
            //             }}
            //         />
            //         {/* <View style={{ backgroundColor: themeColor[theme]['homeBg'] }}>
            //             <Text style={{
            //                 color: themeColor[theme]['textColor'],
            //                 opacity: 0.7,
            //                 fontFamily: "SFProText-Regular",
            //                 fontSize: SZ16,
            //                 lineHeight: SZ24,
            //                 fontWeight: 'bold'
            //             }}>FProText-Regular</Text>

            //             <Text style={{
            //                 color: themeColor[theme]['textColor'],
            //                 opacity: 0.7,
            //                 fontFamily: "Montserrat-Medium",
            //                 fontSize: SZ16,
            //                 lineHeight: SZ24,
            //                 fontWeight: 'bold'
            //             }}>Montserrat-Regular</Text>
            //         </View> */}
            //     </View>
            // </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const { theme, dataProfile } = state;
    return { theme, dataProfile };
};

export default connect(mapStateToProps)(DetailBrew);

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