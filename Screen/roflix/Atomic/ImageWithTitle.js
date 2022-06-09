import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
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

const imageW = (width / 3) - SZ1 * 30
const imageH = imageW / 2 * 3
export default class ImageWithTitle extends Component {
    render() {
        const { item, selectedId } = this.props
        console.log("renderred:", item);
        console.log("selectedId:", selectedId);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.pressed(item)
                }}
                style={{
                    flex: 1 / 3,
                    marginHorizontal: SZ1 * 3,
                    marginBottom: SZ1 * 8
                }}
            >
                <Image
                    source={{
                        uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path
                    }}
                    style={{
                        borderRadius: SZ12,
                        width: imageW,
                        height: imageH,
                    }}
                />
                <Text
                    numberOfLines={1}
                    style={{
                        marginTop: SZ1 * 4,
                        fontFamily: "SFProText-Regular",
                        color: selectedId == item.id ? '#E50914' : "#fff",
                        fontSize: SZ1 * 14
                    }}
                >{item.title}</Text>
                <Text
                    style={{
                        fontFamily: "SFProText-Regular",
                        color: "#fff",
                        fontSize: SZ1 * 11,
                        opacity: 0.5
                    }}
                >
                    {item.release_date.substring(0, 4)}
                </Text>
            </TouchableOpacity>
        )
    }
}