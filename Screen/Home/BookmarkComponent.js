import React, { Component } from 'react';
import { Image, Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../value/Constants';
import { StatusBar } from 'react-native';
// import V2Loading from './miniComponent/V2Loading';
import { Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

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

class BookmarkComponent extends Component {

    urlApi = 'https://hc.transtv.co.id/rest';

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            perusahaan: null,
            loading: false,
            currentScreen: 1
        }
    }


    componentDidMount() {
    }

    _renderItem = ({ item, index }) => {
        const { theme, bookmark, parentProps } = this.props
        var tempIndex = bookmark.findIndex(x => x.id === item.id)
        var isInBookmark = tempIndex == -1 ? false : true
        return (
            <TouchableOpacity
                onPress={() => {
                    parentProps.navigation.navigate("DetailBrew", { data: item })
                }}
                style={{
                    marginTop: index == 0 ? SZ20 : 0,
                    backgroundColor: "#fff",
                    borderRadius: SZ12,
                    marginHorizontal: SZ24,
                    marginBottom: SZ20
                }}
            >
                <View
                    style={{
                        marginHorizontal: SZ12,
                        marginVertical: SZ1 * 8,
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{ flex: 0 }}
                    >

                    </View>
                    <View
                        style={{
                            flex: 9,
                            // backgroundColor: "#eaeaea"
                        }}
                    >
                        <Text style={{
                            minHeight: SZ1 * 28,
                            color: "#494A4B",
                            fontFamily: "SFProText-Regular",
                            fontSize: SZ1 * 14,
                            fontWeight: '600'
                        }}>{item.name}</Text>
                        <Text style={{
                            marginTop: SZ1 * 3,
                            color: "#494A4B",
                            fontFamily: "SFProText-Regular",
                            fontSize: SZ1 * 12,
                            fontWeight: '400'
                        }}>{"Type: " + item.brewery_type}</Text>
                        <Text style={{
                            marginTop: SZ1 * 3,
                            color: "#00A3FF",
                            fontFamily: "SFProText-Regular",
                            fontSize: SZ1 * 12,
                            fontWeight: '400'
                        }}>{(item.street == null ? "" : item.street + ', ') + item.city + " - " + item.state}</Text>
                        {/* <Text>{item.website_url}</Text> */}
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    loading: true
                                })
                                if (isInBookmark) {
                                    var temp = bookmark
                                    temp.splice(tempIndex, 1)
                                    this.props.updateBookmark(temp)
                                    Alert.alert("information", "Remove from bookmar")
                                } else {
                                    var temp = bookmark
                                    temp.push(item)
                                    this.props.updateBookmark(temp)
                                    Alert.alert("information", "Add to bookmark")
                                }
                                this.setState({
                                    loading: false
                                })
                            }}
                        >
                            <Icon
                                name={'trash-outline'}
                                style={{
                                    color: '#00A3FF',
                                    fontSize: SZ1 * 20,
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
    render() {
        const { data, loading } = this.state;
        const { theme, bookmark } = this.props

        return (
            <View
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
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            marginVertical: SZ1 * 16,
                            color: "#fff",
                            fontFamily: "SFProText-Regular",
                            fontSize: SZ1 * 18,
                            lineHeight: SZ24,
                            fontWeight: '800',

                        }}>Bookmark 📔</Text>

                    </View>

                    {/* <View
                        style={{
                            marginTop: SZ1 * 20,
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
                    </View> */}
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                        <View
                            style={{ marginHorizontal: SZ24, marginTop: SZ12 }}
                        >
                            <View style={{
                                marginTop: SZ20 / 2,
                                height: SZ112,
                                backgroundColor: "rgba(187, 107, 217, 0.5)",
                                borderRadius: SZ12,
                                flexDirection: 'row'
                            }}>
                                <View style={{ flex: 0.5 }}>
                                    <View style={{
                                    }}>
                                        <View style={{
                                            marginTop: SZ8 / 8 * 9,
                                            marginHorizontal: SZ12
                                        }}>
                                            <Text style={{
                                                color: "#fff",
                                                fontFamily: "SFProText-Regular",
                                                fontSize: SZ16,
                                                lineHeight: SZ8 / 8 * 24,
                                                fontWeight: '700'
                                            }}>{"Sorry we can't\nFind your data"}</Text>

                                            <Text style={{
                                                color: "#fff",
                                                fontFamily: "SFProText-Regular",
                                                fontWeight: '400',
                                                fontSize: SZ8 / 8 * 13,
                                                lineHeight: SZ8 / 8 * 18,
                                                marginTop: SZ8 / 8 * 6,
                                            }}>You need to add bookmark first</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 0.5,
                                    justifyContent: 'flex-end', alignItems: 'flex-end'
                                }}>
                                    <Image
                                        style={{ width: 157 / 100 * 120, height: 112 / 100 * 120 }}
                                        source={require('./../../assets/salyNodata.png')} />
                                </View>
                            </View>
                        </View>
                    }
                    data={bookmark}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { theme, bookmark } = state;
    return { theme, bookmark };
};

const updateBookmark = bookmark => ({
    type: 'UPDATE_BOOKMARK',
    payload: {
        bookmark
    }
});

export default connect(mapStateToProps, { updateBookmark })(BookmarkComponent);

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