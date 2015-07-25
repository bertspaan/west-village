CREATE VIEW results AS
SELECT a.id, a.address, cl.street,
ST_ShortestLine(a.wkb_geometry, cl.wkb_geometry) AS line
FROM addresses a, centerlines cl, (
  SELECT ogc_fid AS a_fid, (
    SELECT ogc_fid
    FROM centerlines _cl
    ORDER BY ST_Distance(Geography(_a.wkb_geometry), Geography(_cl.wkb_geometry))
    LIMIT 1
  ) AS cl_fid
  FROM addresses _a
) AS a_cl
WHERE a_cl.a_fid = a.ogc_fid AND a_cl.cl_fid = cl.ogc_fid
