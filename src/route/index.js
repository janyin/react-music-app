import React, { Component, lazy, Suspense } from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { ActivityIndicator } from "antd-mobile";
import { connect } from "react-redux";
import { getHomeData, getRankData, getHotWord } from "@/store/action";

const Layout = lazy(() => import("@/page/layout/index"));
const Player = lazy(() => import("@/page/player/index"));
const PlayList = lazy(() => import("@/page/playlist/index"));

/**
 * 路由配置组件
 * @author janyin
 */
class RouteConfig extends Component {
    /**
     * 请求初始数据
     */
    async componentDidMount() {
        const { getHomeData, getRankData, getHotWord } = this.props;
        await Promise.all([getHomeData(), getRankData(), getHotWord()]);
    }

    render() {
        return (
            <HashRouter>
                <Suspense fallback={<ActivityIndicator toast text="loading" />}>
                    <Switch>
                        <Route exact path="/" component={Layout} />
                        <Route path="/playlist" component={PlayList} />
                        <Route path="/player" component={Player} />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
            </HashRouter>
        );
    }
}

export default connect(null, {
    getHomeData,
    getRankData,
    getHotWord,
})(RouteConfig);
