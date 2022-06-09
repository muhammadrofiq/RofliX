import { Text, View, Dimensions, Image } from 'react-native'
import React, { Component } from 'react'

const { width, height } = Dimensions.get('window');

const SZ8 = width / 100 * 2.13
const SZ12 = width / 100 * 3.2
const SZ16 = width / 100 * 4.266
const SZ20 = width / 100 * 5.333
const SZ24 = width / 100 * 6.4
const SZ112 = width / 100 * 30;

export default class NoDataPlaceHolder extends Component {
    render() {
        return (
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
                            source={require('./../../../assets/salyNodata.png')} />
                    </View>
                </View>
            </View>
        )
    }
}