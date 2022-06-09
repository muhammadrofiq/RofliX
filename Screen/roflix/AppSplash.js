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
import { CommonActions } from '@react-navigation/native';

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
        setTimeout(() => { 
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [
                    { name: "MovieHome" },
                ],
            })
            this.props.navigation.dispatch(resetAction);
        },
            1000
        )
    }

    render() {
        const { data, loading } = this.state;
        const { theme } = this.props

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColor[theme]['homeBg'] }}>
                <StatusBar
                    backgroundColor={themeColor[theme]['statusBar']}
                    barStyle={theme == 'dark' ? 'light-content' : "dark-content"} />
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: themeColor[theme]['homeBg']
                }}>
                    <Text
                        style={{
                            color: "#E50914",
                            fontFamily: 'BebasNeue-Regular',
                            fontSize: SZ1 * 100
                        }}
                    >RofliX</Text>
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