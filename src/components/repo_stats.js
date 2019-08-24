import React from 'react';
import {
  Grid,
  Box,
  Text
} from 'grommet';

import {
  Checkmark
} from 'grommet-icons';

/* 
 * Expects a stat obj:
 * {
 *   number: 0,
 *   success: 0,
 *   failed: 0
 * }
*/
export default class Stats extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Grid
          justify="center"
          rows={["xsmall"]}
          columns={["fit", "fit", "fit"]}
          areas={[
            { name: "total", start: [0, 0], end: [0, 0] },
            { name: "success", start: [1, 0], end: [1, 0] },
            { name: "failed", start: [2, 0], end: [2, 0] },
          ]}
        >
          <Box gridArea="total">
            <Box
              align="center"
            >
              <Text> Ran: </Text>
              <Text> { this.props.stats.ran ? this.props.stats.ran : 0 } </Text>
            </Box>
          </Box>
          <Box gridArea="success" color="status-ok">
            <Box
              align="center"
            >
              <Text color="status-ok"> Succeeded: </Text>
              <Text> { this.props.stats.success ? this.props.stats.success : 0 } </Text>
            </Box>
          </Box>
          <Box gridArea="failed" >
            <Box
              align="center"
            >
              <Text color="status-error"> Failed: </Text>
              <Text> { this.props.stats.failed ? this.props.stats.failed : 0 } </Text>
            </Box>
          </Box>
        </Grid>
      </div>
    )
  }
}
