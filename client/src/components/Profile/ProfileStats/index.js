import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import CustomProgressBar from '../../CustomProgressBar';

function ProfileStats({ userData }) {
    return (
        <div className="ui middle aligned center aligned grid mt-3 mb-3">
            <div className="column">
                <Row>
                    <Col>
                        <div className="ui middle aligned center aligned grid">
                            <div className="column">
                                {/* Profile Table */}
                                <Table className="mb-5" size="sm" bordered responsive="xs">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>Language</th>
                                            <th>Average</th>
                                            <th>Percentage</th>
                                            <th>Proficiency</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userData.languages
                                                ? userData.languages.map((data, i) => (
                                                    <tr key={i} className={data.progress ? data.progress < 50 ? 'negative' : data.progress < 90 ? 'warning' : 'positive' : data.progress === 0 ? 'negative' : ''}>
                                                        <td>
                                                            <div className="text-center">
                                                                <img src={data.img} alt="" style={{ height: `${2}rem` }} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <b>{data.title}</b>
                                                        </td>
                                                        <td>{data.progress || data.progress === 0 ? `${data.progress.toFixed(0)}%` : 'N/A'}</td>
                                                        <td style={{ width: 100 }}>
                                                            <CustomProgressBar
                                                                title={data.title}
                                                                newNow={0}
                                                                newMin={0}
                                                                newMax={100}
                                                                percent={data.progress}
                                                            />
                                                        </td>
                                                        <td>{data.progress < 50 ? 'Low' : data.progress < 90 ? 'Medium' : 'High'}</td>
                                                    </tr>
                                                ))
                                                : null
                                        }
                                    </tbody>
                                    <tfoot className="full-width">
                                        <tr>
                                            <th />
                                            <th colSpan="4" />
                                        </tr>
                                    </tfoot>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default connect(({ userData }) => ({ userData }), null)(ProfileStats)
