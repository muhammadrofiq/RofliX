import React, { Component } from 'react';
import { ActivityIndicator, Alert, View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Toolbar } from 'react-native-material-ui';
import { theme as themeColor } from '../../value/Constants';
import { StatusBar } from 'react-native';
import _ from 'lodash';
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

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            perusahaan: null,
            loading: false,
            page: 1,
            currentScreen: 1,
            isCanLoadMore: true,
            search: ""
        }
    }

    componentDidMount() {
        this.getData()
    }

    _search = (search) => {
        this.setState({
            search: search,
            refreshing: true,
            page: 1,
            data: []
        }, () => {
            this._postSearch();
        });
    }

    _postSearch = _.debounce(() => {
        this.setState({ loading: true })
        this.getData()
    }, 1000);

    _keyExtractor = (item, index) => item.id.toString();
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
                                name={isInBookmark ? "bookmark" : "bookmark-outline"}
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

    getData() {
        const { page, search } = this.state
        var link = 'https://api.openbrewerydb.org/breweries?' + 'page=' + page + '&per_page=10' + (search != "" ? '&by_name=' + search : '')
        fetch(link, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var temp = this.state.data.concat(responseJson)
                var canLoadMore = true
                if (responseJson.length < 10) {
                    canLoadMore = false
                }
                this.setState({
                    data: temp,
                    loading: false,
                    isCanLoadMore: canLoadMore
                });
            })
            .catch((error) => {
                console.log("get error:", error)
                this.setState({
                    refreshing: false
                });
            });
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    doSomething = _.debounce(() => {
        const { isCanLoadMore, page } = this.state
        if (this.state.data.length > 0) {
            if (isCanLoadMore) {
                console.log("LOAD MORE");

                this.setState({
                    loadMore: true,
                    page: page + 1,
                    loading: true
                }, () => {
                    this.getData();
                });
            } else {
                console.log("CANT MPRE");
            }
        } else {
            console.log("NODATA");
        }
    }, 100);

    render() {
        const { data, loading } = this.state;
        const { theme, bookmark } = this.props
        // console.log("Bookmark data:", bookmark)

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
                                    onChangeText={(text) => {
                                        this._search(text)
                                    }}
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

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.doSomething();
                        }
                    }}
                    ListEmptyComponent={
                        <View></View>
                    }
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this.footer}
                />
            </View>
        )
    }
}


const updateBookmark = bookmark => ({
    type: 'UPDATE_BOOKMARK',
    payload: {
        bookmark
    }
});
const mapStateToProps = state => {
    const { theme, bookmark } = state;
    return { theme, bookmark };
};

export default connect(mapStateToProps, { updateBookmark })(HomeComponent);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
});