import { Text, View, Dimensions, TouchableOpacity } from 'react-native'
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
        const { title, isShowAll } = this.props
        return (
            <View
                style={{
                    flexDirection: 'row', alignItems: 'center',
                }}
            >
                <View style={{ flex: 1 / 2, flexDirection: 'row' }}>
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
                <View style={{ flex: 1 / 2, alignItems: 'flex-end' }}>
                    {isShowAll == true ?
                        <TouchableOpacity
                            onPress={() => {
                                this.props.pressed()
                            }}
                            style={{
                                borderRadius: SZ1 * 4,
                                backgroundColor: "#E50914"
                            }}
                        >
                            <Text
                                style={{
                                    marginVertical: SZ1 * 2,
                                    marginHorizontal: SZ1 * 8,
                                    color: "#fff",
                                    fontFamily: "SFProText-Regular",
                                    fontSize: SZ1 * 10,
                                    fontWeight: '400',
                                }}>
                                SEE ALL</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        )
    }
}