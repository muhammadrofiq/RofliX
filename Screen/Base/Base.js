import React, { Component } from 'react';
import { Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../value/Constants';
import { StatusBar } from 'react-native';
// import V2Loading from './miniComponent/V2Loading';
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

class V2TeamMate extends Component {

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

    render() {
        const { data, loading } = this.state;
        const { theme } = this.props

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                <View style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                    {/* <V2Loading loading={loading} /> */}
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            backgroundColor: themeColor[theme]['homeBg'],
                            marginHorizontal: SZ24
                        }}
                    >

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: SZ8
                            }}
                        >
                            <View
                                style={{
                                    marginRight: SZ12,
                                    flex: 1,
                                    backgroundColor: themeColor[theme]['cardColor'],
                                    borderRadius: SZ12
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: themeColor[theme]['mainBlue'],
                                        borderRadius: SZ12
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontFamily: "SFProText-Regular",
                                            fontSize: SZ16,
                                            lineHeight: SZ24,
                                            fontWeight: '700',
                                            marginLeft: SZ8,
                                            marginTop: SZ48,
                                            marginBottom: SZ12
                                        }}
                                    >
                                        {"Online" + "\n" + "Leave"}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate("V2OnlineLeaveNewRequest")
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text
                                        style={{
                                            color: themeColor[theme]['textColor'],
                                            fontSize: SZ16,
                                            lineHeight: SZ16,
                                            fontWeight: '700',
                                            marginLeft: SZ12,
                                            marginVertical: SZ8
                                        }}
                                    >Request</Text>

                                    <Icon name="chevron-forward" style={{
                                        marginLeft: SZ20,
                                        color: themeColor[theme]['textColor'],
                                        fontSize: SZ8 / 8 * 24,
                                    }} />
                                </TouchableOpacity>
                            </View>
                            {
                                false ?
                                    <View
                                        style={{
                                            marginLeft: SZ12,
                                            flex: 1,
                                            backgroundColor: themeColor[theme]['cardColor'],
                                            borderRadius: SZ12
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: themeColor[theme]['mainBlue'],
                                                borderRadius: SZ12
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "SFProText-Regular",
                                                    fontSize: SZ16,
                                                    lineHeight: SZ24,
                                                    fontWeight: '700',
                                                    marginLeft: SZ8,
                                                    marginTop: SZ48,
                                                    marginBottom: SZ12
                                                }}
                                            >
                                                {"Approval" + "\n" + "Sick Permission"}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {

                                            }}
                                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    color: themeColor[theme]['textColor'],
                                                    fontSize: SZ16,
                                                    lineHeight: SZ16,
                                                    fontWeight: '400',
                                                    marginLeft: SZ12,
                                                    marginVertical: SZ8
                                                }}
                                            >Approval : 123</Text>

                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ flex: 1, marginRight: SZ24, marginLeft: SZ12 }}></View>
                            }
                        </View>
                    </ScrollView>
                    {/* <View style={{ backgroundColor: themeColor[theme]['homeBg'] }}>
                        <Text style={{
                            color: themeColor[theme]['textColor'],
                            opacity: 0.7,
                            fontFamily: "SFProText-Regular",
                            fontSize: SZ16,
                            lineHeight: SZ24,
                            fontWeight: 'bold'
                        }}>FProText-Regular</Text>

                        <Text style={{
                            color: themeColor[theme]['textColor'],
                            opacity: 0.7,
                            fontFamily: "Montserrat-Medium",
                            fontSize: SZ16,
                            lineHeight: SZ24,
                            fontWeight: 'bold'
                        }}>Montserrat-Regular</Text>
                    </View> */}
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const { theme, dataProfile } = state;
    return { theme, dataProfile };
};

export default connect(mapStateToProps)(V2TeamMate);

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