import { Text, View, Dimensions } from 'react-native'
import React, { Component } from 'react'


const { width, height } = Dimensions.get('window');

const SZ8 = width / 100 * 2.13
const SZ1 = SZ8 / 8
const SZ12 = width / 100 * 3.2
const SZ16 = width / 100 * 4.266
const SZ20 = width / 100 * 5.333
const SZ24 = width / 100 * 6.4
const SZ112 = width / 100 * 30;


export default class MovieSectionTitle extends Component {
    render() {
        const { title } = this.props
        return (
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        alignSelf: 'center',
                        width: SZ1 * 3,
                        height: SZ1 * 18,
                        backgroundColor: "#E50914",
                        marginRight: SZ1 * 10
                    }}
                />
                <Text
                    style={{
                        marginVertical: SZ1 * 16,
                        color: "#fff",
                        fontFamily: "SFProText-Regular",
                        fontSize: SZ1 * 18,
                        lineHeight: SZ24,
                        fontWeight: '800',
                    }}
                >
                    {title}
                </Text>
            </View>
        )
    }
}