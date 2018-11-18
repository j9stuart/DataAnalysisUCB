import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start>/<end><br/>"
        f"/api/v1.0/<start>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return a list of all precipitation at certain dates"""
    # Query measurements
    results = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date > '2016-08-23').order_by(Measurement.date).all()
    # Convert list of tuples into dictionary
    dates = []
    for date, prec in results:
        date_dict = {}
        date_dict[date] = prec
        dates.append(date_dict)

    return jsonify(dates)


@app.route("/api/v1.0/stations")
def stations():
    """Return a list of station data"""
    # Query stations
    results = session.query(Station.station).all()

    # Jsonify results
    return jsonify(results)

@app.route("/api/v1.0/tobs")
def temps():
    """Return a list of precipitation"""
    # Query measurements
    results = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date > '2016-08-23').order_by(Measurement.date).all()
    tobs = []
    for date, prec in results:
        tobs.append(prec)

    # Jsonify results
    return jsonify(tobs)

@app.route("/api/v1.0/<start>/<end>")
def calc_temps(start, end):
    """TMIN, TAVG, and TMAX for a list of dates.
    
    Args:
        start_date (string): A date string in the format %Y-%m-%d
        
    Returns:
        TMIN, TAVE, and TMAX
    """
    
    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= start).filter(Measurement.date <= end).all()

    results = list(np.ravel(results))

    return jsonify(results)
    
@app.route("/api/v1.0/<start>")
def calc_start(start):
    """TMIN, TAVG, and TMAX for a list of dates.
    
    Args:
        start_date (string): A date string in the format %Y-%m-%d
        
    Returns:
        TMIN, TAVE, and TMAX
    """
    
    results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).filter(Measurement.date >= start).all()

    results = list(np.ravel(results))

    return jsonify(results)
        

if __name__ == '__main__':
    app.run(debug=True)
