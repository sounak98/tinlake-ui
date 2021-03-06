import * as React from 'react';
import WithTinlake from '../../../components/WithTinlake';
import IssueLoan from '../../../containers/Loan/Issue';
import { Box, Heading } from 'grommet';
import Header from '../../../components/Header';
import SecondaryHeader from '../../../components/SecondaryHeader';
import { menuItems } from '../../../menuItems';
import { BackLink } from '../../../components/BackLink';
import Auth from '../../../components/Auth';
import Alert from '../../../components/Alert';

interface Props {
  tokenId: string;
  registry: string;
}

class LoanIssuePage extends React.Component<Props> {
  static async getInitialProps({ query }: any) {
    return { tokenId: query.tokenId, registry: query.registry };
  }
  render() {
    const { tokenId, registry } = this.props;
    return <Box align="center" pad={{ horizontal: 'small' }}>
      <Header
        selectedRoute={'/loans/issue'}
        menuItems={menuItems}
      />
      <Box
        justify="center"
        direction="row"
      >
        <Box width="xlarge" >
          <WithTinlake render={tinlake =>
            <Auth tinlake={tinlake} waitForAuthentication waitForAuthorization
              render={auth => auth && auth.state === 'loaded' && auth.user ?
                <Box>
                  <SecondaryHeader>
                    <Box direction="row" gap="small" align="center">
                      <BackLink href={'/loans'} />
                      <Heading level="3">Open Loan</Heading>
                    </Box>
                  </SecondaryHeader>
                  <IssueLoan tinlake={tinlake} auth={auth} tokenId={tokenId} registry={registry}/>
                </Box>
                :
                <Alert margin="medium" type="error">
                  Please authenticate to access this page</Alert>
              } />
          } />
        </Box>
      </Box>
    </Box>;
  }
}

export default LoanIssuePage;
