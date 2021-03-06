import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Icon } from 'native-base';
// import { TouchableOpacity } from 'react-native-gesture-handler'; 

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

const imageW = (width / 2) - SZ1 * 30
const imageH = imageW / 3 * 2
export default class ImageWithTitleTV extends Component {
    render() {
        const { item, isSelected } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.pressed(item)
                }}
                style={{
                    flex: 1 / 2,
                    marginHorizontal: SZ1 * 3,
                    marginBottom: SZ1 * 8
                }}
            >
                <View>
                    <Image
                        source={{
                            uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path
                        }}
                        style={{
                            borderRadius: SZ12,
                            width: imageW,
                            height: imageH,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.props.lovePressed(item)
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 40,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            padding: 1,
                            backgroundColor: "#ffffffaa"
                        }}
                    >
                        <Icon
                            name={isSelected ? "heart" : "heart-outline"}
                            style={{
                                color: '#E50914',
                                fontSize: SZ1 * 22,
                            }} />
                    </TouchableOpacity>
                    <View
                        style={{
                            right: SZ1 * 7,
                            paddingHorizontal: SZ1 * 4,
                            borderRadius: SZ1 * 4,
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: "#E5091444"
                        }}
                    >
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Icon
                                name="star"
                                type='Entypo'
                                style={{
                                    color: '#fff',
                                    fontSize: SZ1 * 12,
                                    marginRight: SZ1 * 2
                                }} />
                            <Text
                                style={{
                                    fontFamily: "SFProText-Regular",
                                    fontSize: SZ1 * 12,
                                    color: "#fff"
                                }}
                            >{item.vote_average}</Text>
                        </View> */}
                    </View>
                </View>
                <Text
                    numberOfLines={1}
                    style={{
                        marginTop: SZ1 * 4,
                        fontFamily: "SFProText-Regular",
                        color: "#fff",
                        fontSize: SZ1 * 14
                    }}
                >{item.original_name}</Text>
                <Text
                    style={{
                        fontFamily: "SFProText-Regular",
                        color: "#fff",
                        fontSize: SZ1 * 11,
                        opacity: 0.5
                    }}
                >
                    {item.first_air_date}
                </Text>
            </TouchableOpacity>
        )
    }
}