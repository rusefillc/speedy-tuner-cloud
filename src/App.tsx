import {
  Routes as ReactRoutes,
  Route,
  useMatch,
} from 'react-router-dom';
import {
  Layout,
  Result,
} from 'antd';
import { connect } from 'react-redux';
import {
  lazy,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
} from 'react';
import TopBar from './components/TopBar';
import StatusBar from './components/StatusBar';
import { Routes } from './routes';
import { loadTune } from './utils/api';
import store from './store';
import Logs from './pages/Logs';
import Loader from './components/Loader';
import {
  AppState,
  NavigationState,
  UIState,
} from './types/state';
import useDb from './hooks/useDb';
import Info from './pages/Info';
import Hub from './pages/Hub';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './App.less';

// TODO: fix this
// lazy loading this component causes a weird Curve canvas scaling
// const Log = lazy(() => import('./pages/Log'));

const Tune = lazy(() => import('./pages/Tune'));
const Diagnose = lazy(() => import('./pages/Diagnose'));
const Login = lazy(() => import('./pages/auth/Login'));
const Profile = lazy(() => import('./pages/auth/Profile'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Upload = lazy(() => import('./pages/Upload'));

const { Content } = Layout;

const mapStateToProps = (state: AppState) => ({
  ui: state.ui,
  status: state.status,
  navigation: state.navigation,
});

const App = ({ ui, navigation }: { ui: UIState, navigation: NavigationState }) => {
  const margin = ui.sidebarCollapsed ? 80 : 250;
  const { getTune } = useDb();

  // const [lastDialogPath, setLastDialogPath] = useState<string|null>();
  // const lastDialogPath = storageGetSync('lastDialog');

  const tunePathMatch = useMatch(`${Routes.TUNE_ROOT}/*`);
  const tuneId = tunePathMatch?.params.tuneId;

  useEffect(() => {
    if (tuneId) {
      getTune(tuneId).then(async (tuneData) => {
        loadTune(tuneData);
        store.dispatch({ type: 'tuneData/load', payload: tuneData });
      });

      store.dispatch({ type: 'navigation/tuneId', payload: tuneId });
    }

    // storageGet('lastDialog')
    //   .then((path) => setLastDialogPath(path));

    // window.addEventListener('beforeunload', beforeUnload);
    // return () => {
    //   window.removeEventListener('beforeunload', beforeUnload);
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuneId]);

  const ContentFor = useCallback((props: { element: ReactNode, marginLeft?: number }) => {
    const { element, marginLeft } = props;

    return (
      <Layout style={{ marginLeft }}>
        <Layout className="app-content">
          <Content>
            <Suspense fallback={<Loader />}>
              {element}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }, []);

  return (
    <>
      <Layout>
        <TopBar tuneId={navigation.tuneId} />
        <ReactRoutes>
          <Route path={Routes.HUB} element={<ContentFor element={<Hub />} />} />
          <Route path={Routes.TUNE_ROOT} element={<ContentFor element={<Info />} />} />
          <Route path={`${Routes.TUNE_TUNE}/*`} element={<ContentFor marginLeft={margin} element={<Tune />} />} />
          <Route path={Routes.TUNE_LOGS} element={<ContentFor marginLeft={margin} element={<Logs />} />} />
          <Route path={Routes.TUNE_DIAGNOSE} element={<ContentFor marginLeft={margin} element={<Diagnose />} />} />
          <Route path={Routes.LOGIN} element={<ContentFor element={<Login />} />} />
          <Route path={Routes.PROFILE} element={<ContentFor element={<Profile />} />} />
          <Route path={Routes.SIGN_UP} element={<ContentFor element={<SignUp />} />} />
          <Route path={Routes.RESET_PASSWORD} element={<ContentFor element={<ResetPassword />} />} />
          <Route path={Routes.UPLOAD} element={<ContentFor element={<Upload />} />} />
        </ReactRoutes>
        <Result status="warning" title="Page not found" style={{ marginTop: 50 }} />
      </Layout>
      <StatusBar />
    </>
  );
};

export default connect(mapStateToProps)(App);
